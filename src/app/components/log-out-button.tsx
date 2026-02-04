"use client"

import { signOut } from "next-auth/react"

export default function LogOutButton() {
    return <button className="cursor-pointer p-5 mt-2 border border-gray-300 rounded-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300" onClick={() => signOut({ redirectTo: "/" })}>Log Out</button>

}