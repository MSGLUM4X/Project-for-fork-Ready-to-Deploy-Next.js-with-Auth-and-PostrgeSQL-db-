'use client'

import OauthProviderButton from "@/app/auth/login/oauth-provider-button";
import { useSearchParams } from 'next/navigation';


const SignInPage = () =>{
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] shadow-2xl rounded-2xl flex flex-col p-5 sm:p-20 justify-start items-center">
                <p className="mb-10 sm:mb-20 font-bold font-mono text-5xl inset-0 text-transparent [-webkit-text-stroke:2px_#374151] drop-shadow-xl/50">Connexion</p>
                <div className="w-full h-[50px] sm:h-[60px] mb-10">
                    <OauthProviderButton callbackUrl={callbackUrl} provider={"github"} srcImage={"/sso/github.svg"}/>
                </div>
                <div className="w-full h-[50px] sm:h-[60px]">
                    <OauthProviderButton callbackUrl={callbackUrl} provider={"google"} srcImage={"/sso/google.svg"}/>
                </div>
            </div>
        </div>
    )
}

export default SignInPage;