import { supabase } from "../lib/supabaseClient";

export const fetchPublishedPosts = async () => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, cover_image_url, author, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const fetchPostBySlug = async (slug) => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  if (error) throw error;
  return data;
};

export const fetchAllPostsForAdmin = async () => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const createPost = async (post) => {
  const { data, error } = await supabase.from("blog_posts").insert(post).select().single();
  if (error) throw error;
  return data;
};

export const updatePost = async (id, updates) => {
  const { data, error } = await supabase
    .from("blog_posts")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deletePost = async (id) => {
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw error;
};
