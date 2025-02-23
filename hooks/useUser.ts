import { getUser } from "@/supabase-api/user";
import { useSession } from "@/context/ctx";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const { session } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["user", session?.user.id],
    queryFn: () => getUser(session?.user.id!),
    enabled: !!session?.user.id,
  });

  return { user: data?.user, isLoading };
};
