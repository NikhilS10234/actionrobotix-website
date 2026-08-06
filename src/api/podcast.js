import { supabase } from "../lib/supabaseClient";

export const fetchPublishedEpisodes = async () => {
  const { data, error } = await supabase
    .from("podcast_episodes")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const fetchAllEpisodesForAdmin = async () => {
  const { data, error } = await supabase.from("podcast_episodes").select("*").order("published_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const createEpisode = async (episode) => {
  const { data, error } = await supabase.from("podcast_episodes").insert(episode).select().single();
  if (error) throw error;
  return data;
};

export const updateEpisode = async (id, updates) => {
  const { data, error } = await supabase.from("podcast_episodes").update(updates).eq("id", id).select().single();
  if (error) throw error;
  return data;
};

export const deleteEpisode = async (id) => {
  const { error } = await supabase.from("podcast_episodes").delete().eq("id", id);
  if (error) throw error;
};
