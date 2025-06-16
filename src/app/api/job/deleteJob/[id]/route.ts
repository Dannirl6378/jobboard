import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  const companyid = req.headers.get("x-company-id");

  try {
    const job = await prisma.job.findUnique({
      where: { id },
    });

    if (!job || job.companyid !== companyid) {
      return NextResponse.json({ error: "Not authorized or job not found" }, { status: 403 });
    }

    const deletedJob = await prisma.job.delete({
      where: { id },
    });
    await prisma.user.deleteMany({
  where: {
    role: "TEMPORAL",
    Application: { none: {} }
  }
});

    return NextResponse.json(deletedJob, { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}
