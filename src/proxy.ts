import {auth} from "@/auth"

export default auth ;

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|favicon.ico|sitemap.xml|\\.well-known/|403).*)'],
};
