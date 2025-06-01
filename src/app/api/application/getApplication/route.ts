import { PrismaClient } from "@/generated/prisma";
import { Application } from '../../../../generated/prisma/index';
const prisma = new PrismaClient();

export async function GET() {
    try {
      const Applications = await prisma.application.findMany();
      return Response.json(Applications); // ✔️ správná odpověď
    } catch (error) {
      return new Response(JSON.stringify({ error: "Server error" }), {
        status: 500,
      }); // ✔️ chyba jako Response
    }
  }