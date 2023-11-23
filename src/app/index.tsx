import { FC } from 'react';

import { UIProvider } from './providers/UIProvider';
import { Router } from './providers/RouterProvider';
import { QueryProvider } from './providers/QueryProvider';

import './index.css';

const App: FC = () => {
  return (
    <QueryProvider>
      <UIProvider>
        <Router />
      </UIProvider>
    </QueryProvider>
  );
};

export default App;
