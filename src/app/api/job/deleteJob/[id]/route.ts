import { supabase } from "@/lib/supbaseClient";

export async function DELETE(
	req: Request,
	context: { params: { id: string } }
) {
	const params = await context.params;
	const { id } = params;
	const companyid = req.headers.get("x-company-id");
	const role = req.headers.get("x-role"); // Přidej do fetchDeleteJob také tuto hlavičku!

	console.log(
		"Delete request for job ID:",
		id,
		"by company ID:",
		companyid,
		"role:",
		role
	);

	try {
		// najdi job
		const { data: jobData, error: fetchError } = await supabase
			.from("Job")
			.select("*")
			.eq("id", id)
			.single();

		console.log("Fetched job data:", jobData, "Fetch error:", fetchError);

		// Pokud není ADMIN, kontroluj companyid
		if (role !== "ADMIN") {
			if (fetchError || !jobData || jobData.companyid !== companyid) {
				return new Response(
					JSON.stringify({ error: "Not authorized or job not found" }),
					{ status: 403 }
				);
			}
		} else {
			if (fetchError || !jobData) {
				return new Response(JSON.stringify({ error: "Job not found" }), {
					status: 404,
				});
			}
		}

		// smaž job
		const { data: deletedData, error: deleteError } = await supabase
			.from("Job")
			.delete()
			.eq("id", id);

		if (deleteError) {
			throw deleteError;
		}

		// volitelné: smazat TEMPORAL users bez žádostí
		const { error: cleanError } = await supabase
			.from("User")
			.delete()
			.eq("role", "TEMPORAL")
			.is("Application", null);

		if (cleanError) {
			console.warn("Could not clean TEMPORAL users:", cleanError.message);
		}

		return new Response(JSON.stringify(deletedData), { status: 200 });
	} catch (error: any) {
		console.error("Delete error:", error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}
