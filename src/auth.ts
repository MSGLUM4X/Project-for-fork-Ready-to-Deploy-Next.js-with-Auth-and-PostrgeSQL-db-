import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import {DefaultUser} from "@auth/core/types";
import {createUser, findUniqueUser} from "@/lib/auth/data";


declare module "next-auth" {
    interface User extends DefaultUser {
        email_verified: boolean;
        authorization:userType[];
    }
}


/**
 * userType is used to classify the user depending on their authorisation
 */
enum userType {
    service_1 = "service_1",
    service_2 = "service_2",
    admin = "admin",
}

/**
 * ALLOW_EMAIL is an env variable where you stock people's email addresses
 * that have the right to connect to your app
 */
const SERVICE1_EMAIL = JSON.parse(process.env.SERVICE1_EMAIL ?? "[]") as string[];
const SERVICE2_EMAIL = JSON.parse(process.env.SERVICE2_EMAIL ?? "[]") as string[];
const ADMIN_EMAIL = JSON.parse(process.env.ADMIN_EMAIL ?? "[]") as string[];


/**
 * @param verified is the email_verified send by the Oauth provider
 * @param email is the email address you want to check the access
 * @return all the access link to this email
 */
const authorization = (email:string, verified:boolean) : userType[] => {
    if (!verified) return [];
    const access = [];
    if (ADMIN_EMAIL.includes(email)){
        access.push(userType.admin)
    }
    if (SERVICE1_EMAIL.includes(email)){
        access.push(userType.service_1)
    }
    if (SERVICE2_EMAIL.includes(email)){
        access.push(userType.service_2)
    }
    return access;
}



type GitHubEmail = {
    email: string;
    verified: boolean;
    primary: boolean;
}
type githubAuthorizationReturn = {
    verified:boolean,
    email?:string,
    authorization?:userType[],
}
/**
 * Specific function for GitHub because one account could be linked to several email addresses.
 */
const githubAuthorization = (emails:GitHubEmail[]) : githubAuthorizationReturn => {
    const emailsVerified = emails.filter(e=>e.verified);
    if (emailsVerified.length === 0) return {verified:false};
    const primaryEmail : string = emailsVerified.find(e => e.primary)?.email || emailsVerified[0].email;
    let access : userType[] = [];
    emailsVerified.forEach((e)=>
    {
        const auth : userType[] = authorization(e.email,e.verified);
        access = [...new Set<userType>([...access, ...auth])]
    })
    return {
        verified: true,
        email: primaryEmail,
        authorization: access
    }

}


export const { auth, handlers, signIn, signOut  } = NextAuth({
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    providers: [GitHub({
        authorization: {
            params: {
                prompt: "select_account",
                scope: "read:user user:email",
            },
        },
        async profile(profile, tokens) {

            /* One GitHub account could be linked to several email addresses.
            * With this fetch we get all these email addresses and check if they are
            * verified.
            */

            const res = await fetch("https://api.github.com/user/emails", {
                headers: {
                    Authorization: `Bearer ${tokens.access_token}`,
                    Accept: "application/vnd.github+json",
                },
            });

            const emails: GitHubEmail[] = await res.json();

            const authorizationGitHub = githubAuthorization(emails)
            const email_verified = authorizationGitHub.verified;
            const email = authorizationGitHub.email || null;
            const authorization : userType[] = authorizationGitHub.authorization || []

            return {
                name: profile.name ?? profile.login,
                email: email,
                authorization:authorization,
                email_verified: email_verified,
            };
        },
    }), Google({
        authorization: {
            params: {
                prompt: "select_account",
            },
        },
        async profile(profile) {
            return {
                name: profile.name,
                email: profile.email,
                authorization: authorization(profile.email,profile.email_verified),
                email_verified: profile.email_verified,
            };
        },
    })
    ],
    callbacks: {
        authorized({ auth, request: { nextUrl } }){
            const pathname = nextUrl.pathname;
            const callbackUrl = nextUrl.searchParams.get('callbackUrl') || '/';
            const isLoggedIn = !!auth?.user;
            const authorization : userType[] = auth?.user?.authorization || [];
            const isOnAuth = nextUrl.pathname.startsWith('/auth');
            const isOnService =  pathname === '/service' ||  nextUrl.pathname.startsWith('/service/')
            const isOnService2 = pathname === '/service2' || nextUrl.pathname.startsWith('/service2/');
            const isOnAdmin = nextUrl.pathname.startsWith('/admin');
            const isOnError = nextUrl.pathname.startsWith('/error');
            const isOnUpgrade = nextUrl.pathname.startsWith('/upgrade');

            const pathnameRoot = nextUrl.pathname.replace(/\/+$/, "")
            const isOnRoot = pathnameRoot === "";


            if (authorization.includes(userType.admin)){
                return true;
            }

            if (authorization.includes(userType.service_1) ){
                if (isOnService){
                    return true;
                }
                if (isOnService2){
                    return Response.redirect(new URL("/upgrade?service=service_2", nextUrl));
                }
            }
            if (authorization.includes(userType.service_2) ){
                if (isOnService2){
                    return true;
                }
                if (isOnService){
                    return Response.redirect(new URL("/upgrade?service=service_1", nextUrl));
                }
            }
            if (isOnAuth){
                if (isLoggedIn) return Response.redirect(new URL(callbackUrl, nextUrl));
                return true;
            }
            if (isOnRoot || isOnError || isOnUpgrade){
                return true;
            }
            if (isLoggedIn) {
                if (isOnAdmin){
                    return Response.redirect(new URL("/error?error=403", nextUrl));
                }
                return Response.redirect(new URL("/error?error=404", nextUrl));
            }
            return false;
        },
        async signIn({account, profile, user}) {
            if (!account || !user.email_verified || !user.email) {
                return false;
            }

            if (user.authorization.length == 0) return false;

            let findUser = await findUniqueUser(user.email);
            if (!findUser.success){
                findUser = await createUser(user.email);

            }
            if (!findUser.success){
                /**
                 * Here you can handle the false success with the error return by your database if you want to.
                 */
                return false;
            }

            user.id = findUser.id;
            return true;


        },
        jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.authorization = user.authorization
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.id as string
            session.user.authorization = token.authorization as userType[];
            return session
        },
    }
});

