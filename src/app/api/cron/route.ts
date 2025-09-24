import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE_KEY! // musíš použít Service Role Key
);

export async function GET(req: Request) {
	console.log("CRON invoked at", new Date().toISOString());

	// smaže všechny joby starší než 1 den
	try {
		const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    if (req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

		// smaže joby
		const { data: deletedJobs, error: jobsError } = await supabase
			.from("Job")
			.select("*")
			.eq("isDemo", true)
			.lt("createdat", cutoff)
			.select(); // vrátí smazané řádky (pokud to chceš zkontrolovat)

		if (jobsError) throw jobsError;

		const { data: deletedUsers, error: usersError } = await supabase
			.from("User")
			.delete()
			.eq("isDemo", true)
			.lt("created_at", cutoff)
			.select();

		if (usersError) throw usersError;

		console.log("🗑️ Deleted jobs:", deletedJobs?.length || 0);
		console.log("🗑️ Deleted users:", deletedUsers?.length || 0);

		return NextResponse.json({
			success: true,
			deletedJobs: deletedJobs?.length || 0,
			deletedUsers: deletedUsers?.length || 0,
		});
	} catch (err) {
		console.error("❌ Cron error:", err);
		return NextResponse.json(
			{ success: false, error: String(err) },
			{ status: 500 }
		);
	}
}
