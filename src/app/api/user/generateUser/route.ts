import { supabase } from "@/lib/supbaseClient";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { name, email, password, about, CV, Phone, CoverLetter, role } = await request.json();

  try {
    const { data: newUser, error } = await supabase
      .from("User")
      .insert([{ name, email, password, about, CV, Phone, CoverLetter, role }])
      .select()
      .single(); // .single() vrátí vložený záznam

    if (error) {
      console.error("Supabase insert error:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (err: any) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
