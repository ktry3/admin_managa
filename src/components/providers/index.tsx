'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const Provider = ({ children, session }: { children: React.ReactNode; session: any }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <SessionProvider session={session}>{children}</SessionProvider>
    </QueryClientProvider>
  );
};

export default Provider;
