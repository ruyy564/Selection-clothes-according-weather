/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useMutation } from '@tanstack/react-query';
import { FormInstance } from 'antd';
import { useEffect, useState } from 'react';
import { fetchClothes } from 'shared/api';
import { GENDER, PART_BODY, TYPE } from 'shared/api/constants';
import { Clothes, EmptyClothes, Weather } from 'shared/api/types';
import { DIFF, getCoefTemp, parseKelvinToCelsius } from 'shared/libs';
import { FormType } from '../ui/MainPage';

export type Reducer = { [key in PART_BODY]: (Clothes | EmptyClothes)[][] };

const emptyClothes: EmptyClothes = {
  coefficient: 0,
  type: 'empty',
};

type FiltredClothes = {
  clothes: (EmptyClothes | Clothes)[];
  coefficient: number;
};

const decart = (lists: (Clothes | EmptyClothes)[][]) => {
  return lists.reduce(
    (acc, list) => acc.map((x) => list.map((y) => x.concat(y))).reduce((acc, list) => acc.concat(list), []),
    [[]] as (Clothes | EmptyClothes)[][],
  );
};

const filterByCoef = (list: FiltredClothes[], coefficientCurrentTemp: number) => {
  return list.filter(
    (item) => item.coefficient <= coefficientCurrentTemp + DIFF && item.coefficient >= coefficientCurrentTemp - DIFF,
  );
};

const calcSum = (lists: (Clothes | EmptyClothes)[][]) =>
  lists.map((list) =>
    list.reduce(
      (acc, item) => {
        acc.clothes.push(item);
        acc.coefficient += item.coefficient;
        return acc;
      },
      {
        clothes: [] as (Clothes | EmptyClothes)[],
        coefficient: 0,
      },
    ),
  );

const filterClothes = (clothes: Clothes[], form: FormInstance<FormType>) => {
  const formValue = form.getFieldsValue();

  const result = clothes.reduce(
    (acc, item) => {
      if (!item.style.includes(formValue.styleClothes)) {
        return acc;
      }

      if (!(item.age[0] <= formValue.age && item.age[1] >= formValue.age)) {
        return acc;
      }

      switch (item.type) {
        case TYPE.LOW:
          acc[item.partOfBody[0]][0].push(item);
          break;
        case TYPE.MIDDLE:
          acc[item.partOfBody[0]][1].push(item);
          break;
        case TYPE.HIGH:
          acc[item.partOfBody[0]][2].push(item);
          break;
      }
      return acc;
    },
    {
      [PART_BODY.BODY]: [[emptyClothes], [emptyClothes], [emptyClothes]],
      [PART_BODY.HEAD]: [[emptyClothes], [emptyClothes], [emptyClothes]],
      [PART_BODY.LEGS]: [[emptyClothes], [emptyClothes], [emptyClothes]],
      [PART_BODY.FOOT]: [[emptyClothes], [emptyClothes], [emptyClothes]],
    } as Reducer,
  );

  return result;
};

export const useGetClothes = (form: FormInstance<FormType>, weather?: Weather) => {
  const [loading, setLoading] = useState(false);
  const [data, setDate] = useState<Record<PART_BODY, FiltredClothes[]>>({} as Record<PART_BODY, FiltredClothes[]>);

  const mutation = useMutation({
    mutationFn: ({ gender }: { gender: GENDER }) => {
      setLoading(true);
      return fetchClothes(gender);
    },
    onSuccess: (res) => {
      setLoading(false);
      return res;
    },
  });

  useEffect(() => {
    if (weather && mutation.data) {
      const data = filterClothes(mutation.data, form);
      const newData = {} as Record<PART_BODY, FiltredClothes[]>;

      for (const key in data) {
        const tempCoef = getCoefTemp(parseKelvinToCelsius(weather.main.feels_like));
        const dec = decart(data[key as PART_BODY]);
        const sumDec = calcSum(dec);
        const filteredClothes = filterByCoef(sumDec, tempCoef);

        newData[key as PART_BODY] = filteredClothes;
      }

      setDate(newData);
    }
  }, [form, mutation.data, weather]);
  console.log('data', data);
  return { mutation, loading, data };
};
