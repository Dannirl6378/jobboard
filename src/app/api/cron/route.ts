import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // musíš použít Service Role Key
);

export async function DELETE() {
  // smaže všechny joby starší než 1 den
  await supabase
    .from("Job")
    .delete()
    .eq("isDemo", true)
    .lt("createdat", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

  // smaže všechny uživatele starší než 1 den
  await supabase
    .from("User")
    .delete()
    .eq("isDemo", true)
    .lt("createdat", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

  return NextResponse.json({ status: "ok", message: "Old demo data deleted" });
}
