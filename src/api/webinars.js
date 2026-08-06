import { supabase } from "../lib/supabaseClient";

export const fetchUpcomingWebinars = async () => {
  const { data, error } = await supabase
    .from("webinars")
    .select("*")
    .gte("starts_at", new Date().toISOString())
    .order("starts_at", { ascending: true });
  if (error) throw error;
  return data;
};

export const fetchPastWebinars = async () => {
  const { data, error } = await supabase
    .from("webinars")
    .select("*")
    .lt("starts_at", new Date().toISOString())
    .order("starts_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const fetchAllWebinarsForAdmin = async () => {
  const { data, error } = await supabase.from("webinars").select("*").order("starts_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const createWebinar = async (webinar) => {
  const { data, error } = await supabase.from("webinars").insert(webinar).select().single();
  if (error) throw error;
  return data;
};

export const updateWebinar = async (id, updates) => {
  const { data, error } = await supabase.from("webinars").update(updates).eq("id", id).select().single();
  if (error) throw error;
  return data;
};

export const deleteWebinar = async (id) => {
  const { error } = await supabase.from("webinars").delete().eq("id", id);
  if (error) throw error;
};
