import { supabase } from "../lib/supabaseClient";

export const checkIsAdmin = async (userId) => {
  if (!userId) return false;
  const { data, error } = await supabase.from("admins").select("user_id").eq("user_id", userId).maybeSingle();
  if (error) return false;
  return Boolean(data);
};
