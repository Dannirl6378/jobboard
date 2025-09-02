
import { supabase } from "@/lib/supbaseClient";

export async function PUT(request: Request, context: { params: { id: string } }) {
const params = await context.params;
  const { id } = params;
  const { title, description, salary, location } = await request.json();

  try {
    // aktualizace jobu
    const { data, error } = await supabase
      .from("Job")
      .update({ title, description, salary: parseFloat(salary), location })
      .eq("id", id);

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    console.error("Job update failed:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

