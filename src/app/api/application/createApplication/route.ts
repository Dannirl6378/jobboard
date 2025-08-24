import { PrismaClient } from "@/generated/prisma"; // nebo jen 'prisma' pokud používáš jiný import
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
import { supabase } from "../../../../lib/supbaseClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userid, jobid } = body;

    if (!userid || !jobid) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const { data, error } = await supabase
      .from("Application")
      .insert([{ userid, jobid }]);

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error: any) {
    console.error("Error creating application:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
