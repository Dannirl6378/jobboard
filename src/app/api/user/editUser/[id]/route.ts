
import { supabase } from "@/lib/supbaseClient";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest, context: any) {
  const params = await context.params;
  const { id } = params;
  const { name, email, password, about, CV, Phone, CoverLetter } = await request.json();

  try {
    const { data, error } = await supabase
      .from("User")
      .update({ name, email, password, about, CV, Phone, CoverLetter })
      .eq("id", id)
      .select(); // select() vrátí aktualizovaný řádek

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err: any) {
    console.error("User update failed:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

  