import { supabase } from "@/lib/supbaseClient";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  try {
    const { data: user, error } = await supabase
      .from("User")
      .select("*")
      .eq("email", email)
      .single(); // .single() vrátí jeden záznam nebo chybu, pokud není

    if (error) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err: any) {
    console.error("Error fetching user:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
