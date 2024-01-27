"use client"

import { FormData } from "@/app/login/page";
import Link from "next/link";
import { ChangeEvent } from "react";

type AuthFormProps = {
    formData: FormData
    handleFormData: (e: ChangeEvent<HTMLInputElement>) => void
    success: string,
    error: string,
    loading: boolean,
    authAction: () => Promise<void>
    authText: "Log in" | "Sign up"
}

// A COMPONENT THAT RETURNS A FORM BASED ON THE AUTH ACTION
export default function AuthForm({handleFormData, success, error, loading, authAction, formData, authText}: AuthFormProps){
    return (
      <div className="container mx-auto w-[400px] grid gap-4">
        <div className="grid">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormData(e)}
            className="text-black"
          />
        </div>

        <div className="grid">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleFormData(e)}
            className="text-black"
          />
        </div>

        <div>
          <button
            className="px-4 py-2 bg-blue-500 rounded cursor-pointer"
            onClick={() => authAction()}
            disabled={loading}
          >
            {authText}
          </button>

          {error && <p>{error}</p>}
          {loading && <p>Loading...</p>}
          {success && <p>{success}</p>}

          <Link
            href={authText === "Log in" ? "/signup" : "/login"}
            className="hover:underline text-blue-300"
          >
            Click here to {authText === "Log in" ? "Sign up" : "Log in"}
          </Link>
        </div>
      </div>
    );
}