import { createClient } from "@/utils/supabase/client";
import { UserResponse } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [data, setData] = useState<UserResponse>();
  const supabase = createClient();

  const getUser = async () => {
    const data = await supabase.auth.getUser();
    setData(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return data;
};
