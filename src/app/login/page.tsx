"use client"

import React from "react"
import { supabase } from "@/lib/supabase"
import {useRouter} from "next/navigation"

type FormData = {
    email: string,
    password: string,
}

export default function Login(){
    const [formData, setFormData] = React.useState<FormData>({
        email: '',
        password: ''
    })

    const [resetPassword, setResetPassword] = React.useState<boolean>(false)
    const [success, setSuccess] = React.useState<boolean>(false)

    const router = useRouter()

    async function login(): Promise<void>{
        try{
            const {data, error} = await supabase.auth.signInWithPassword(formData)

            if(data){
                router.refresh()
            }else{
                throw new Error(error?.message)
            }
        }catch(error: unknown){
            console.error(error)
        }
    }

    function handleFormData(e: React.ChangeEvent<HTMLInputElement>): void{
        const {name, value} = e.target
        setFormData(prevFormData => ({...prevFormData, [name]: value}))
    }

    async function resetPasswords(){
      try{
        await supabase.auth.resetPasswordForEmail(formData.email, {redirectTo: `${window.location.href}reset`})
        setSuccess(true)
      }catch(error: unknown){
        console.error(error)
      }
    }

    return (
      <div className="container w-[400px] mx-auto">
        <div className="grid">
          <label htmlFor="email">Email</label>

          <input
            type="text"
            name="email"
            id="email"
            placeholder="Your email here"
            value={formData.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFormData(e)
            }
          />
        </div>

        {!resetPassword && <div className="grid">
          <label htmlFor="password">Password</label>

          <input
            type="text"
            name="password"
            id="password"
            placeholder="Your password here"
            value={formData.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFormData(e)
            }
          />
        </div>}

        {resetPassword && <button 
          className="bg-blue-100 px-2 py-4 cursor-pointer" 
          onClick={() => resetPasswords()}
        >Reset the password</button>}

        {success && <p className="bg-green-100 px-2 py-4 cursor-pointer text-green-700">Check email to reset</p>}

        <button 
          onClick={() => setResetPassword(prevState => !prevState)}
          className="cursor-pointer hover:underline"
        >{resetPassword ? "Reset Password" : "Log in"}</button>
      </div>
    );
}