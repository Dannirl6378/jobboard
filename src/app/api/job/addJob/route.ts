import { PrismaClient } from "@/generated/prisma"; // nebo jen 'prisma' pokud používáš jiný import
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, location, salary, category, companyid,Attendance } = body;

    if (!title || !description || !location || !salary || !companyid || !category || !Attendance) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newJob = await prisma.job.create({
      data: {
        title,
        description,
        location,
        salary: parseFloat(salary),
        category,
        companyid,
        Attendance,
      },
    });

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}
