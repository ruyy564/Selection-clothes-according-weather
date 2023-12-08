/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Collapse, CollapseProps, Flex, Form, Layout, theme, Typography } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';

import { useEffect, useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { FormQueryWeather } from 'widgets/FormQueryWeather';

import { parseKelvinToCelsius } from 'shared/libs';
import { GENDER, PART_BODY } from 'shared/api/constants';
import { CardClothes } from './CardClothes';
import style from './style.module.less';
import { useGetWeather } from '../hooks/useGetWeather';
import { useGetClothes } from '../hooks/useGetClothes';

export type FormType = {
  city: string;
  gender: GENDER;
  age: number;
  styleClothes: string;
};

const headerStyle: React.CSSProperties = {
  height: 40,
  paddingInline: 50,
};

export const MainPage = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const [form] = Form.useForm<FormType>();
  const [activeKey, setActiveKey] = useState(['1']);
  const [excludedClothes, setExcludedClothes] = useState<PART_BODY[]>([]);

  const { mutation: weatherMutation, loading: loadingWeather } = useGetWeather();
  const { mutation: clothesMutation, loading: loadingClothes, data } = useGetClothes(form, weatherMutation.data);

  const loading = loadingWeather || loadingClothes;

  const onChange = (key: string | string[]) => {
    Array.isArray(key) && setActiveKey(key);
  };

  useEffect(() => {
    if (weatherMutation.data && clothesMutation.data) {
      setActiveKey([]);
    }
  }, [clothesMutation.data, weatherMutation.data]);

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Параметры подбора одежды',
      children: (
        <FormQueryWeather
          form={form}
          clothesMutation={clothesMutation}
          loadingClothes={loadingClothes}
          weatherMutation={weatherMutation}
          loadingWeather={loadingWeather}
        />
      ),
      extra: <SettingOutlined />,
    },
  ];

  return (
    <Layout className={style.layout}>
      <Header style={{ ...headerStyle, background: colorPrimary }}>
        <Typography.Title level={1} style={{ fontSize: 20 }}>
          Подбор одежды по погоде
        </Typography.Title>
      </Header>
      <Content className={style.content}>
        <Flex vertical align="center" style={{ padding: 24 }} gap={20}>
          <Collapse onChange={onChange} items={items} style={{ width: '600px' }} activeKey={activeKey} />
          <Flex align="flex-start" style={{ padding: 24 }} gap={20}>
            {weatherMutation.data && (
              <Card
                title="Погода:"
                style={{ width: 300 }}
                headStyle={{ backgroundColor: colorPrimary }}
                loading={loading}
                hoverable
              >
                <p>Город: {weatherMutation.data.name}</p>
                <p>Температура: {parseKelvinToCelsius(weatherMutation.data.main.temp)}, C</p>
                <p>Ощущается как: {parseKelvinToCelsius(weatherMutation.data.main.feels_like)}, C</p>
                <p>Скорость ветра: {weatherMutation.data.wind.speed} м/с</p>
              </Card>
            )}
            {Object.entries(data).length > 0 && (
              <Card
                title={'Одежда:'}
                headStyle={{ backgroundColor: colorPrimary }}
                bodyStyle={{ maxHeight: 500, overflow: 'auto' }}
              >
                <CardClothes data={data[PART_BODY.HEAD]} title={'Голова:'} loading={loading} />
                <CardClothes data={data[PART_BODY.BODY]} title={'Тело:'} loading={loading} />
                {!excludedClothes.includes(PART_BODY.LEGS) && (
                  <CardClothes data={data[PART_BODY.LEGS]} title={'Ноги:'} loading={loading} />
                )}
                <CardClothes data={data[PART_BODY.FOOT]} title={'Обувь:'} loading={loading} />
              </Card>
            )}
          </Flex>
        </Flex>
      </Content>
    </Layout>
  );
};
