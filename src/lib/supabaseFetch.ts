// lib/supabaseFetch.ts
import { supabase } from "./supbaseClient";

export async function fetchFromSupabase<T>(table: string) : Promise<T[]> {
  const { data, error } = await supabase.from(table).select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data ?? [];
}
