"use client";

import { createClient } from "@/utils/supabase/client";
import { UserResponse } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  data: UserResponse | null;
}

const UserContext = createContext<UserContextType>({ data: null });

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<UserResponse | null>(null);

  const supabase = createClient();

  const getUser = async () => {
    const data = await supabase.auth.getUser();
    setData(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ data }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const { data } = useContext(UserContext);
  return data;
};
