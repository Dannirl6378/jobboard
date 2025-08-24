import { PrismaClient } from "@/generated/prisma";
import { Application } from '../../../../generated/prisma/index';
const prisma = new PrismaClient();

import { fetchFromSupabase } from "@/lib/supabaseFetch";

export async function GET() {
  try {
    const jobs = await fetchFromSupabase("Application");
    return new Response(JSON.stringify(jobs), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}