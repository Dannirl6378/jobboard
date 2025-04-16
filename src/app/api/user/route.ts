import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return Response.json(users); // ✔️ správná odpověď
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    }); // ✔️ chyba jako Response
  }
}
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await prisma.user.create({ data: body });
    return Response.json(user); // ✔️ správná odpověď
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    }); // ✔️ chyba jako Response
  }
}
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const user = await prisma.user.delete({
      where: { id: body.id },
    });
    return Response.json(user); // ✔️ správná odpověď
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    }); // ✔️ chyba jako Response
  }
}
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const user = await prisma.user.update({
      where: { id: body.id },
      data: body,
    });
    return Response.json(user); // ✔️ správná odpověď
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    }); // ✔️ chyba jako Response
  }
}