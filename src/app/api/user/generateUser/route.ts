import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request: Request) {
  
    const { name, email, password, about, CV ,Phone, CoverLetter, role} = await request.json();
  
    try {
      const newUser = await prisma.user.create({
        data: { name, email,password, about, CV, Phone, CoverLetter, role},
      });
      console.log("updated", newUser);
  
      return NextResponse.json(newUser);
    } catch (error) {
        console.error(error);
      return NextResponse.json({ error: "user update failed" }, { status: 500 });
    }
  }
  