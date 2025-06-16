import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  //const userid = req.headers.get("x-company-id");

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user || user.id !== id) {
      return NextResponse.json({ error: "Not authorized or User not found" }, { status: 403 });
    }

    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    await prisma.user.deleteMany({
   where: {
    role: { in: ["TEMPORAL", "ADMIN", "COMPANY", "USER"] },
    Application: { none: {} }
  }
});

    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
