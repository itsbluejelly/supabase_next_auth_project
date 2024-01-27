// functional logic hook

import { supabase } from "@/lib/supabase";
import { useState } from "react";

export const useSupabase = () => {
  const [user, setUser] = useState<any>()

  const getCurrentUser = async () => {
    const { data: { user: currentUser } } = await supabase.auth.getUser()

    if(!currentUser){
      throw new Error("Sorry, user not found")  
    }

    setUser(currentUser)
  }

  return {
    user,
    getCurrentUser
  }
}