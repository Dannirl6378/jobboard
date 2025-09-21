import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // musíš použít Service Role Key
);

export async function GET() {
  // smaže všechny joby starší než 1 den
  await supabase
    .from("jobs")
    .delete()
    .eq("isDemo", true)
    .lt("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

  // smaže všechny uživatele starší než 1 den
  await supabase
    .from("users")
    .delete()
    .eq("isDemo", true)
    .lt("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

  return NextResponse.json({ status: "ok", message: "Old demo data deleted" });
}
