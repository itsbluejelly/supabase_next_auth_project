"use client"

import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  async function logout(){
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <div>
      <p>Hello World</p>
      <button onClick={() => logout()} className="px-2 py-1 bg-blue-500 cursor-pointer text-white">Logout</button>
    </div>
  )
}
