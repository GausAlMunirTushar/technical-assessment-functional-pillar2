"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export const NextAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SessionProvider>
      {children}
      <Toaster position="top-right" theme="dark" richColors />
    </SessionProvider>
  );
};
