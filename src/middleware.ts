import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest): Promise<NextResponse<unknown>>{
    const res: NextResponse<unknown> = NextResponse.next();
    const whiteList: string[] = ['/login', '/signup']

    const supabase = createMiddlewareClient({ req, res });
    const {data: {session}} = await supabase.auth.getSession();

    if(whiteList.includes(req.nextUrl.pathname) && !session){
        return res
    }

    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    if(whiteList.includes(req.nextUrl.pathname) && session){
      return NextResponse.rewrite(new URL('/', req.url))    
    }else{
      return res
    }
};

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}