"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React from "react";

type FormData = {
  password: string;
  confirmPassword: string;
};

export default function Login() {
  const [formData, setFormData] = React.useState<FormData>({
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  async function login(){
    if(formData.password !== formData.confirmPassword){
        alert("The passwords must match")
    }

    const {data, error} = await supabase.auth.updateUser({ password: formData.confirmPassword })

    if(data){
        router.push('/')
    }
  }

  function handleFormData(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  return (
    <div className="container w-[400px] mx-auto">
      <div className="grid">
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
      </div>

      <div className="grid">
        <label htmlFor="confirmPassword">Confirm Password</label>

        <input
          type="text"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Your Confirm Password here"
          value={formData.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFormData(e)
          }
        />
      </div>

      <button
        onClick={() => login()}
        className="cursor-pointer hover:underline"
      >
        Reset Password
      </button>
    </div>
  );
}
