"use client";

// IMPORTING NECESSARY MODULES
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthForm from "@/components/AuthForm";

// A TYPE FOR THE FORMDATA
export type FormData = {
  email: string;
  password: string;
};

// A PAGE THAT SHOWS THE SIGNUP PAGE
export default function Signup() {
  // A STATE TO TRACK THE FORM DATA
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  // STATES TO TRACK SUCCESS, LOADING AND ERRORS FROM REQUESTS
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // FETCHING THE ROUTE FROM THE NAVIGATION
  const router = useRouter();

  // A FUNCTION TO SIGNUP TO THE PAGE
  async function signup(): Promise<void> {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const { error } = await supabase.auth.signUp(formData);

      if (error) {
        throw new Error(error.message);
      } else {
        setError("");
        setSuccess(`An email has successfully been sent to ${formData.email}`);
        router.refresh();
      }
    } catch (error: unknown) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  // A FUNCTION TO HANDLE FORM DATA
  function handleChange(e: any) {
    setError("");

    try {
      const { name, value } = e.target;

      if (!value) {
        throw new Error(`The property ${name} must have a value`);
      }

      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));

      setError("");
    } catch (error: unknown) {
      setError((error as Error).message);
    }
  }

  return (
    <AuthForm
      success={success}
      error={error}
      loading={isLoading}
      authAction={signup}
      handleFormData={handleChange}
      formData={formData}
      authText="Sign up"
    />
  );
}
