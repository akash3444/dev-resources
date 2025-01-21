"use client";

import { UserProvider } from "@/contexts/user-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import React from "react";
import { CSPostHogProvider } from "./posthog-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <CSPostHogProvider>
          <UserProvider>{children}</UserProvider>
        </CSPostHogProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
};

export default Providers;
