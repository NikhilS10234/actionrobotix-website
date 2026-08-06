import { createContext, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import { signIn as apiSignIn, signOut as apiSignOut, signInWithMagicLink as apiSignInWithMagicLink } from "../api/auth";
import { checkIsAdmin } from "../api/admins";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;

    supabase.auth.getSession().then(async ({ data }) => {
      const sessionUser = data.session?.user ?? null;
      setUser(sessionUser);
      setIsAdmin(await checkIsAdmin(sessionUser?.id));
      setLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const sessionUser = session?.user ?? null;
      setUser(sessionUser);
      setIsAdmin(await checkIsAdmin(sessionUser?.id));
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    const { user: signedInUser } = await apiSignIn(email, password);
    setUser(signedInUser);
    setIsAdmin(await checkIsAdmin(signedInUser?.id));
    return signedInUser;
  };

  const signInWithMagicLink = async (email, redirectPath) => {
    await apiSignInWithMagicLink(email, redirectPath);
  };

  const signOut = async () => {
    await apiSignOut();
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, signIn, signInWithMagicLink, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
