import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function PUT(
    request: Request,
    context: { params: Promise<{ id: string }> }
  ) {
    const params =await context.params; // ✅ správně
    const {id} = params; 
  
    const { name, email, password, about} = await request.json();
  
    try {
      const updated = await prisma.user.update({
        where: { id },
        data: { name, email, password, about },
      });
      console.log("updated", updated);
  
      return NextResponse.json(updated);
    } catch (error) {
      return NextResponse.json({ error: "user update failed" }, { status: 500 });
    }
  }
  