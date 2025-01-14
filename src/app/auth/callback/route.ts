import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.nextUrl);
  const code = requestUrl.searchParams.get("code");
  try {
    if (code) {
      const supabase = await createClient();
      await supabase.auth.exchangeCodeForSession(code);
    }
  } catch (e) {
    console.error("Auth Callback", e);
  }
  return NextResponse.redirect(requestUrl.origin);
}
