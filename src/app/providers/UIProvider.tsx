import { App, ConfigProvider, theme, type ThemeConfig } from 'antd';
import { FC } from 'react';

type Props = {
  children?: React.ReactNode;
};

export const UIProvider: FC<Props> = ({ children }) => {
  const customConfig: ThemeConfig = {
    algorithm: theme.darkAlgorithm,
    token: {
      colorPrimary: '#df2fff',
    },
  };

  return (
    <ConfigProvider theme={customConfig}>
      <App>{children}</App>
    </ConfigProvider>
  );
};
