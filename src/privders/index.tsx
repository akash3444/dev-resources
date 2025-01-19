"use client";

import { UserProvider } from "@/contexts/user-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <UserProvider>{children}</UserProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
};

export default Providers;
