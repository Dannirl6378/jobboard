import { PrismaClient } from "@/generated/prisma"; // nebo jen 'prisma' pokud používáš jiný import
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userid,jobid } = body;

    if (!userid || !jobid) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newApplication = await prisma.application.create({
      data: {
        userid,
        jobid,
      },
    });

    return NextResponse.json(newApplication, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}