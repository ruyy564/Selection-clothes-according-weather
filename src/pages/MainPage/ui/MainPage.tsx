import { Card, Collapse, CollapseProps, Flex, Layout, theme, Typography } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';

import { useEffect, useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { FormQueryWeather } from 'widgets/FormQueryWeather';

import { parseKelvinToCelsius } from 'shared/libs';
import style from './style.module.less';
import { useGetWeather } from '../hooks/useGetWeather';

const headerStyle: React.CSSProperties = {
  height: 40,
  paddingInline: 50,
};

export const MainPage = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [activeKey, setActiveKey] = useState(['1']);
  const { mutation: weatherMutation, loading: loadingWeather } = useGetWeather();

  const onChange = (key: string | string[]) => {
    console.log(key);
    Array.isArray(key) && setActiveKey(key);
  };

  useEffect(() => {
    if (weatherMutation.data) {
      setActiveKey([]);
    }
  }, [weatherMutation.data]);

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Параметры подбора одежды',
      children: <FormQueryWeather weatherMutation={weatherMutation} loadingWeather={loadingWeather} />,
      extra: <SettingOutlined />,
    },
  ];

  return (
    <Layout className={style.layout}>
      <Header style={{ ...headerStyle, background: colorPrimary }}>
        <Typography.Title level={3}>Подбор одежды по погоде</Typography.Title>
      </Header>
      <Content className={style.content}>
        <Flex vertical align="center" style={{ padding: 24 }} gap={20}>
          <Collapse onChange={onChange} items={items} style={{ width: '600px' }} activeKey={activeKey} />
          {weatherMutation.data && (
            <Card title="Погода:" style={{ width: 300 }} loading={loadingWeather} hoverable>
              <p>Город: {weatherMutation.data.name}</p>
              <p>Температура: {parseKelvinToCelsius(weatherMutation.data.main.temp)}, C</p>
              <p>Ощущается как: {parseKelvinToCelsius(weatherMutation.data.main.feels_like)}, C</p>
              <p>Скорость ветра: {weatherMutation.data.wind.speed} м/с</p>
              <p>Тип погоды: {weatherMutation.data.weather[0].main}</p>
            </Card>
          )}
        </Flex>
      </Content>
    </Layout>
  );
};
