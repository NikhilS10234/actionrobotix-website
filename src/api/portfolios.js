import { supabase } from "../lib/supabaseClient";

export const fetchApprovedPortfolios = async () => {
  const { data, error } = await supabase
    .from("team_portfolios")
    .select("id, team_number, team_name, season, portfolio_url, description, submitted_at")
    .eq("approved", true)
    .order("submitted_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const submitPortfolio = async (portfolio) => {
  const { data, error } = await supabase
    .from("team_portfolios")
    .insert({ ...portfolio, approved: false })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const fetchAllPortfoliosForAdmin = async () => {
  const { data, error } = await supabase
    .from("team_portfolios")
    .select("*")
    .order("submitted_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const setPortfolioApproved = async (id, approved) => {
  const { data, error } = await supabase
    .from("team_portfolios")
    .update({ approved })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deletePortfolio = async (id) => {
  const { error } = await supabase.from("team_portfolios").delete().eq("id", id);
  if (error) throw error;
};
