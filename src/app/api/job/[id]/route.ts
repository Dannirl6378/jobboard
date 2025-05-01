import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = params;
	const { title, description } = await request.json(); // Předpokládám, že pošleš title a description

	try {
		const updatedJob = await prisma.job.update({
			where: { id },
			data: { title, description },
		});

		return NextResponse.json(updatedJob);
	} catch (error) {
		return NextResponse.json({ error: "Error updating job" }, { status: 500 });
	}
}
