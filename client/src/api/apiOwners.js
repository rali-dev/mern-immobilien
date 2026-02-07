import supabaseClient from "@/utils/supabase";

export async function upsertOwner(token, _options, ownerData) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("owners")
    .upsert([ownerData], { onConflict: "owner_id" })
    .select()
    .single();

  if (error) {
    console.error("Error upserting owner:", error);
    return null;
  }

  return data;
}

export async function getOwnerById(token, { owner_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("owners")
    .select("owner_id, name, lastname, email, phone")
    .eq("owner_id", owner_id)
    .single();

  if (error) {
    console.error("Error fetching owner:", error);
    return null;
  }

  return data;
}