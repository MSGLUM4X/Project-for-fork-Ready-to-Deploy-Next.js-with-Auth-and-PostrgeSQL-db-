'use client'

import { useSearchParams } from "next/navigation"
import Link from "next/link";
import Image from "next/image";


enum Error {
    Configuration = "Configuration",
    AccessDenied = "AccessDenied",
    Verification = "Verification",
    Default = "Default"
}

const errorMap = {
    [Error.Configuration]: (
        <p>
            There was a problem when trying to authenticate. Please contact us if this
            error persists. Unique error code:{" "}
            <code className="rounded-sm bg-slate-100 p-1 text-xs">Configuration</code>
        </p>
    ),
    [Error.AccessDenied]: (
        <p>
            You don't have the right to access this demo. Please contact me if you want
            to access it.
            Unique error code:{" "}
            <code className="rounded-sm bg-slate-100 p-1 text-xs">AccessDenied</code>
        </p>
    ),
    [Error.Verification]: (
        <p>
            There was a problem when trying to authenticate. Please contact us if this
            error persists. Unique error code:{" "}
            <code className="rounded-sm bg-slate-100 p-1 text-xs">Verification</code>
        </p>
    ),
    [Error.Default]: (
        <p>
            There was a problem when trying to authenticate. Please contact us if this
            error persists.
        </p>
    ),
}

/**
 * You can show here specific message depending on the authentication error that occurred. You will notice that the first callbackUrl is loose now.
 */
export default function ErrorAuthPage() {
    const search = useSearchParams()
    const error = search.get("error") as Error
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center">
            <div
                className="w-4/5 mt-10 block max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
                <div className="flex flex-row justify-evenly m-4">
                    <Link
                        className="border rounded-lg p-2"
                        href="/"
                    >
                        <Image src="/icons/home-svgrepo-com.svg" width={20} height={20} alt="Retry Login"/>
                    </Link>
                    <Link
                        className="border rounded-lg p-2"
                        href="/auth/login"
                    >
                        <Image src="/icons/dismiss-svgrepo-com.svg" width={20} height={20} alt="Retry Login"/>
                    </Link>
                </div>
                <h5 className="mb-2 flex flex-row items-center justify-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Something went wrong
                </h5>
                <div className="font-normal text-gray-700 dark:text-gray-400">
                    {errorMap[error] || "Please contact us if this error persists."}
                </div>
            </div>
        </div>
    )
}