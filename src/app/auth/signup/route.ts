import {createRouteHandlerClient} from "@supabase/auth-helpers-nextjs"
import {cookies} from "next/headers"
import {NextRequest, NextResponse} from "next/server"

export async function POST(req: NextRequest){
    const url: URL = new URL(req.url)
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const formData = await req.formData()
    const email = formData.get("email")?.toString()
    const password = formData.get("password")?.toString()

    if(email && password){
        const {data, error} = await supabase.auth.signUp({email, password, options: {emailRedirectTo: `${url.origin}/auth/callback`}})

        data ? console.log(data) : console.log(error)
    }

    return NextResponse.redirect(url, { status: 301 })
}