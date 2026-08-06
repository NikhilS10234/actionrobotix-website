import { supabase } from "../lib/supabaseClient";

export const fetchThreads = async () => {
  const { data, error } = await supabase
    .from("forum_threads")
    .select("id, title, body, author_name, pinned, created_at")
    .order("pinned", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const fetchThread = async (id) => {
  const { data, error } = await supabase.from("forum_threads").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
};

export const fetchReplies = async (threadId) => {
  const { data, error } = await supabase
    .from("forum_replies")
    .select("*")
    .eq("thread_id", threadId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
};

export const createThread = async ({ title, body, authorId, authorName }) => {
  const { data, error } = await supabase
    .from("forum_threads")
    .insert({ title, body, author_id: authorId, author_name: authorName })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const createReply = async ({ threadId, body, authorId, authorName }) => {
  const { data, error } = await supabase
    .from("forum_replies")
    .insert({ thread_id: threadId, body, author_id: authorId, author_name: authorName })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteThread = async (id) => {
  const { error } = await supabase.from("forum_threads").delete().eq("id", id);
  if (error) throw error;
};

export const deleteReply = async (id) => {
  const { error } = await supabase.from("forum_replies").delete().eq("id", id);
  if (error) throw error;
};
