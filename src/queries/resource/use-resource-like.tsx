"use client";

import { createClient } from "@/utils/supabase/client";
import { useUser } from "../auth";

export const useResourceLike = () => {
  const supabase = createClient();
  const userData = useUser();
  const userId = userData?.data?.user?.id;

  const likeResource = async (resourceId: string) => {
    await supabase.from("likes").insert({
      resource_id: resourceId,
      user_id: userId,
    });
  };

  const unlikeResource = async (resourceId: string) => {
    await supabase.from("likes").delete().match({
      resource_id: resourceId,
      user_id: userId,
    });
  };

  return { likeResource, unlikeResource };
};
