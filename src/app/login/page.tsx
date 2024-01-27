"use client"

import React from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

type FormData = { email: string }

export default function Login(){
    const [formData, setFormData] = React.useState<FormData>({ email: '' })
    const [success, setSuccess] = React.useState<boolean>(false)

    async function login(): Promise<void>{
        try{
            const {data, error} = await supabase.auth.signInWithOtp({...formData, options: { shouldCreateUser: true }})

            if(data.user){
                setSuccess(true)
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

        {/* <div className="grid">
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
        </div> */}

        {success && <p className="my-4 bg-green-100 px-2 text-green-600">An email has been sent to {formData.email}</p>}
        <button onClick={() => login()}>Log in</button>
      </div>
    );
}