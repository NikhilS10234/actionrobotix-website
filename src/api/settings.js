import { supabase } from "../lib/supabaseClient";

export const fetchSetting = async (key) => {
  const { data, error } = await supabase.from("site_settings").select("value").eq("key", key).single();
  if (error) throw error;
  return data.value;
};

export const fetchAllSettings = async () => {
  const { data, error } = await supabase.from("site_settings").select("*").order("key");
  if (error) throw error;
  return data;
};

export const updateSetting = async (key, value) => {
  const { data, error } = await supabase
    .from("site_settings")
    .update({ value, updated_at: new Date().toISOString() })
    .eq("key", key)
    .select()
    .single();
  if (error) throw error;
  return data;
};
