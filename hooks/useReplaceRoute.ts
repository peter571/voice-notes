import { useSession } from "@/context/ctx";
import { router } from "expo-router";
import { useEffect } from "react";

export const useReplaceRoute = () => {
  const { session } = useSession();

  useEffect(() => {
    // If session exists, redirect to home screen.
    if (session && session.user) {
      router.replace("/");
    }
  }, []);
};
