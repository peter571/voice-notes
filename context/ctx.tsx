import {
  useContext,
  createContext,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

const AuthContext = createContext<{
  session?: Session | null;
  isLoading: boolean;
}>({
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * This effect will run once when the component mounts.
   * It will check if there is a session in the secure storage.
   * If there is a session, it will set the session state.
   * If there is no session, it will set the session state to null.
   * Whenever the auth state changes, it will update the session state.
   */
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
