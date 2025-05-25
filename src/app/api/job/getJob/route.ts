import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function GET() {
    try {
      const Job = await prisma.job.findMany();
      return Response.json(Job); // ✔️ správná odpověď
    } catch (error) {
      return new Response(JSON.stringify({ error: "Server error" }), {
        status: 500,
      }); // ✔️ chyba jako Response
    }
  }

  