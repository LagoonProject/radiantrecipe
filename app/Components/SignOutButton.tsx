"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export const SignOutComponent = () => {
    const supabase = createClientComponentClient()

    const router = useRouter()
    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
      }
    return  <button onClick={handleSignOut} className="mx-4 text-slate-100">Sign Out</button>
}