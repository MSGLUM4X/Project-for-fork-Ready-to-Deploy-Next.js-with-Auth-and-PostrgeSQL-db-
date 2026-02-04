'use client'

import { useSearchParams } from "next/navigation"
import Link from "next/link";
import Image from "next/image";


enum Upgrade {
    s1 = "service_1",
    s2 = "service_2"
}

const UpgradeMap = {
    [Upgrade.s1]: (
        <p>
            You need to upgrade your authorization to get service 1.
        </p>
    ),
    [Upgrade.s2]: (
        <p>
            You need to upgrade your authorization to get service 2.
        </p>
    ),

}


export default function UpgradePage() {
    const search = useSearchParams()
    const error = search.get("upgrade") as Upgrade


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
                <div className="font-normal text-gray-700 dark:text-gray-400">
                    {UpgradeMap[error] || "You need to upgrade your account to get allowed to access this service."}
                </div>
            </div>
        </div>
    )
}