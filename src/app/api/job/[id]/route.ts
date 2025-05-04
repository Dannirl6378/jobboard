import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();


    export async function PUT(
        request: Request,
        context: { params: Promise<{ id: string }> }
      ) {
        const params =await context.params; // ✅ správně
        const {id} = params; 
      
        const { title, description, salary, location} = await request.json();
      
        try {
          const updated = await prisma.job.update({
            where: { id },
            data: { title, description, salary, location },
          });
          console.log("updated", updated);
      
          return NextResponse.json(updated);
        } catch (error) {
          return NextResponse.json({ error: "Job update failed" }, { status: 500 });
        }
      }
      
