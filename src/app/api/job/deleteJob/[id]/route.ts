import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
import { supabase } from "@/lib/supbaseClient";

export async function DELETE(req: Request, context: { params: { id: string } }) {
  const params = await context.params;
  const { id } = params;
  const companyid = req.headers.get("x-company-id");

  try {
    // nejdřív najdi job
    const { data: jobData, error: fetchError } = await supabase
      .from("Job")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !jobData || jobData.companyid !== companyid) {
      return new Response(JSON.stringify({ error: "Not authorized or job not found" }), { status: 403 });
    }

    // smaž job
    const { data: deletedData, error: deleteError } = await supabase
      .from("Job")
      .delete()
      .eq("id", id);

    if (deleteError) {
      throw deleteError;
    }

    // volitelné: smazat TEMPORAL users bez žádostí
    const { error: cleanError } = await supabase
      .from("User")
      .delete()
      .eq("role", "TEMPORAL")
      .is("Application", null); // supabase nemá přesně "none", kontrola podle vztahů

    if (cleanError) {
      console.warn("Could not clean TEMPORAL users:", cleanError.message);
    }

    return new Response(JSON.stringify(deletedData), { status: 200 });
  } catch (error: any) {
    console.error("Delete error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
