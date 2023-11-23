import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC } from 'react';

type Props = {
  children?: React.ReactNode;
};

export const QueryProvider: FC<Props> = ({ children }) => {
  const queryClient = new QueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
