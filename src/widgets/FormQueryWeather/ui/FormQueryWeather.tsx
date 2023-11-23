import { Button, Flex, Form, Input, InputNumber, Radio, Select } from 'antd';
import { FC } from 'react';

import { UseMutationResult } from '@tanstack/react-query';
import { WEATHER_PERIOD } from 'shared/api/constants';
import { FetchWeather, Weather } from 'shared/api/types';
import style from './style.module.less';
import { useGetClosesStyle } from '../hooks/useGetClosesStyle';

const { Option } = Select;

const options = [
  { label: 'Сейчас', value: WEATHER_PERIOD.CURRENT },
  { label: 'В течении часа', value: WEATHER_PERIOD.HOURLY },
  { label: 'Сегодня', value: WEATHER_PERIOD.DAILY },
];

type FormType = {
  city: string;
  weatherPeriod: WEATHER_PERIOD;
};

type Props = {
  weatherMutation: UseMutationResult<Weather, Error, FetchWeather, unknown>;
  loadingWeather: boolean;
};

export const FormQueryWeather: FC<Props> = (props) => {
  const { weatherMutation, loadingWeather } = props;
  const [form] = Form.useForm<FormType>();

  const closesStyleQuery = useGetClosesStyle();

  const onFinish = ({ city, weatherPeriod }: { city: string; weatherPeriod: WEATHER_PERIOD }) => {
    weatherMutation.mutate({ city, weatherPeriod });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="wrap"
      layout={'horizontal'}
      colon={true}
      className={style.form}
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 15 }}
      onFinish={onFinish}
      initialValues={{
        weatherPeriod: WEATHER_PERIOD.CURRENT,
      }}
    >
      <Form.Item name="weatherPeriod" noStyle>
        <Radio.Group
          options={options}
          optionType="button"
          value={form.getFieldValue('weatherPeriod')}
          style={{ marginBottom: 20, display: 'flex', justifyContent: 'center' }}
        />
      </Form.Item>
      <Form.Item name="city" label="Город" rules={[{ required: true, message: 'Введите город!' }]}>
        <Input placeholder="Введите город" />
      </Form.Item>
      <Form.Item name="radio-button" label="Пол" rules={[{ required: true, message: 'Выберете ваш пол!' }]}>
        <Radio.Group>
          <Radio value="male"> М</Radio>
          <Radio value="female"> Ж</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="input-number" label="Возраст" rules={[{ required: true, message: 'Введите ваш возраст!' }]}>
        <InputNumber min={1} max={99} />
      </Form.Item>
      <Form.Item name="select" label="Стиль одежды" rules={[{ required: true, message: 'Выберете стиль одежды!' }]}>
        <Select placeholder="Выберете стиль одежды" loading={closesStyleQuery.isLoading}>
          {closesStyleQuery.data?.map((item, index) => {
            return (
              <Option key={index} value={item.key}>
                {item.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item noStyle>
        <Flex justify="center" gap={10} style={{ marginTop: 40 }}>
          <Button type="primary" htmlType="submit" loading={loadingWeather}>
            Подобрать одежду
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Сбросить
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};
