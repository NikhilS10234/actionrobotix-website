import { supabase } from "../lib/supabaseClient";

export const subscribeToNewsletter = async (email) => {
  const { error } = await supabase.from("newsletter_subscribers").insert({ email });
  if (error) throw error;
};

export const fetchSubscribersForAdmin = async () => {
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("subscribed_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const deleteSubscriber = async (id) => {
  const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", id);
  if (error) throw error;
};
