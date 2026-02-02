"use client";

import { SessionProvider } from "next-auth/react";
import { TamboProvider } from "@tambo-ai/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TamboProvider apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}>
        {children}
      </TamboProvider>
    </SessionProvider>
  );
}
