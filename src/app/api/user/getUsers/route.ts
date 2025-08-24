import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

import { supabase } from "@/lib/supbaseClient";
import { NextRequest } from "next/server";

import { fetchFromSupabase } from "@/lib/supabaseFetch";

export async function GET() {
	try {
		const user = await fetchFromSupabase("User");
		return new Response(JSON.stringify(user), { status: 200 });
	} catch (error: any) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}
	/*
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { data: user, error } = await supabase
			.from("User")
			.insert([body])
			.select()
			.single();
		if (error) throw error;

		return new Response(JSON.stringify(user), { status: 201 });
	} catch (err: any) {
		return new Response(JSON.stringify({ error: err.message }), {
			status: 500,
		});
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const { id } = await request.json();
		const { data: user, error } = await supabase
			.from("User")
			.delete()
			.eq("id", id)
			.select()
			.single();
		if (error) throw error;

		return new Response(JSON.stringify(user), { status: 200 });
	} catch (err: any) {
		return new Response(JSON.stringify({ error: err.message }), {
			status: 500,
		});
	}
}

export async function PATCH(request: NextRequest) {
	try {
		const body = await request.json();
		const { id, ...updateData } = body;

		const { data: user, error } = await supabase
			.from("User")
			.update(updateData)
			.eq("id", id)
			.select()
			.single();
		if (error) throw error;

		return new Response(JSON.stringify(user), { status: 200 });
	} catch (err: any) {
		return new Response(JSON.stringify({ error: err.message }), {
			status: 500,
		});
	}
}
*/