import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
import { supabase } from "@/lib/supbaseClient";

export async function DELETE(
	req: NextRequest,
	context: { params: { id: string } }
) {
	const params = await context.params;
	const { id } = params;

	try {
		// ověření, že uživatel existuje
		const { data: userData, error: fetchError } = await supabase
			.from("User")
			.select("*")
			.eq("id", id)
			.single();

		if (fetchError || !userData) {
			return new Response(JSON.stringify({ error: "User not found" }), {
				status: 404,
			});
		}

		// odstranění uživatele
		const { data: deletedUser, error: deleteError } = await supabase
			.from("User")
			.delete()
			.eq("id", id);

		if (deleteError) {
			throw deleteError;
		}

		// volitelně: hromadné mazání TEMPORAL uživatelů, kteří nemají žádnou aplikaci
		const { error: bulkDeleteError } = await supabase
			.from("user")
			.delete()
			.in("role", ["TEMPORAL", "ADMIN", "COMPANY", "USER"])
			.is("Application", null);

		if (bulkDeleteError) {
			console.warn("Bulk delete TEMPORAL users failed:", bulkDeleteError);
		}

		return new Response(JSON.stringify(deletedUser), { status: 200 });
	} catch (error: any) {
		console.error("Delete error:", error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}
