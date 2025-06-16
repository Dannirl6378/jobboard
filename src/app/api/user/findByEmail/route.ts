import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email } = await request.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
  }
  return Response.json(user);
}