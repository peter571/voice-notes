import { supabase } from "@/lib/supabase";

export const getUser = async (id: string) => {
  try {
    const user = await supabase.auth.getUser();
    return user.data;
  } catch (error) {
    throw error;
  }
};
