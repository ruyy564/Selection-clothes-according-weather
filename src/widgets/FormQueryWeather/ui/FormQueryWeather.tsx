import { Button, Flex, Form, FormInstance, Input, InputNumber, Radio, Select } from 'antd';
import { FC } from 'react';

import { UseMutationResult } from '@tanstack/react-query';
import { Clothes, FetchWeather, Weather } from 'shared/api/types';
import { GENDER } from 'shared/api/constants';
import { FormType } from 'pages/MainPage/ui/MainPage';
import style from './style.module.less';
import { useGetClosesStyle } from '../hooks/useGetClosesStyle';

const { Option } = Select;

type Props = {
  form: FormInstance<FormType>;
  weatherMutation: UseMutationResult<Weather, Error, FetchWeather, unknown>;
  loadingWeather: boolean;
  clothesMutation: UseMutationResult<
    Clothes[],
    Error,
    {
      gender: GENDER;
    },
    unknown
  >;
  loadingClothes: boolean;
};

export const FormQueryWeather: FC<Props> = (props) => {
  const { form, weatherMutation, loadingWeather, clothesMutation, loadingClothes } = props;

  const closesStyleQuery = useGetClosesStyle();

  const onFinish = ({ city }: FormType) => {
    weatherMutation.mutate({ city });
    clothesMutation.mutate({ gender: form.getFieldValue('gender') });
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
    >
      <Form.Item name="city" label="Город" rules={[{ required: true, message: 'Введите город!' }]}>
        <Input placeholder="Введите город" />
      </Form.Item>
      <Form.Item name="gender" label="Пол" rules={[{ required: true, message: 'Выберете ваш пол!' }]}>
        <Radio.Group>
          <Radio value={GENDER.MALE}> М</Radio>
          <Radio value={GENDER.FEMALE}> Ж</Radio>
          <Radio value={GENDER.UNISEX}> Унисекс</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="age" label="Возраст" rules={[{ required: true, message: 'Введите ваш возраст!' }]}>
        <InputNumber min={1} max={99} />
      </Form.Item>
      <Form.Item
        name="styleClothes"
        label="Стиль одежды"
        rules={[{ required: true, message: 'Выберете стиль одежды!' }]}
      >
        <Select placeholder="Выберете стиль одежды" loading={closesStyleQuery.isLoading}>
          {closesStyleQuery.data?.map((item) => {
            return (
              <Option key={item.id} value={item.name}>
                {item.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item noStyle>
        <Flex justify="center" gap={10} style={{ marginTop: 40 }}>
          <Button type="primary" htmlType="submit" loading={loadingWeather || loadingClothes}>
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
