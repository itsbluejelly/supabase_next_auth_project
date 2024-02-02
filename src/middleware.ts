import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest): Promise<NextResponse<unknown>>{
    console.log("middleware")
    const res: NextResponse<unknown> = NextResponse.next();
    const whiteList: string[] = ['/login', '/signup']

    const supabase = createMiddlewareClient({ req, res });
    const {data: {user}} = await supabase.auth.getUser();

    if(whiteList.includes(req.nextUrl.pathname) && !user){
      return res   
    }
    
    if(!user){
      return NextResponse.redirect(new URL('/login', req.url))
    }
    
    if(whiteList.includes(req.nextUrl.pathname) && user){
      return NextResponse.redirect(new URL('/', req.url))    
    }
    
    return res
};

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}