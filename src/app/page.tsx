"use client"

import {supabase} from "@/lib/supabase"
import React from "react"

export default function Home() {
  const setNewView: () => Promise<void> = React.useCallback(async() => {
    const {data, error} = await supabase.from("views").select()
    data?.length ? console.log(data) : console.log(error)
  }, [])

  React.useEffect(() => {setNewView}, [setNewView])

  return <h1>Hello world</h1>
}
