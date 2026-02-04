'use client'

import { useSearchParams } from "next/navigation"
import Link from "next/link";
import Image from "next/image";


enum Error {
    e403 = "403",
    e404 = "404"
}

const errorMap = {
    [Error.e403]: (
        <p>
            You dont have the access.
        </p>
    ),
    [Error.e404]: (
        <p>
            Page not found.
        </p>
    ),

}

/**
 * You can redirect your user here to show specific ui error. You can have all the error you want in the errorMap.
 * Then on the error redirect your user on error with the parameters that match your errors.
 */
export default function ErrorClient() {
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