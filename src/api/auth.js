import { supabase } from "../lib/supabaseClient";

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const requestPasswordReset = async (email) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/admin/login`,
  });
  if (error) throw error;
};

// Passwordless sign-in for public forum participants — anyone can request a
// magic link, no admin account creation involved.
export const signInWithMagicLink = async (email, redirectPath = "/forum") => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${window.location.origin}${redirectPath}` },
  });
  if (error) throw error;
};
