/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useMutation } from '@tanstack/react-query';
import { FormInstance } from 'antd';
import { useEffect, useState } from 'react';
import { fetchClothes } from 'shared/api';
import { PART_BODY } from 'shared/api/constants';
import { AnyClothes, Weather } from 'shared/api/types';
import { getCoefTemp, parseKelvinToCelsius } from 'shared/libs';
import { calcSum } from '../libs/calcSumCoefDecart';
import { filterByCoef } from '../libs/filterByCoef';
import { FormType } from '../ui/MainPage';
import { filterClothes } from '../libs/filterClothes';
import { decart } from '../libs/decart';

export type FiltredClothes = {
  clothes: AnyClothes[];
  coefficient: number;
};

type Data = Record<PART_BODY, FiltredClothes[]>;

export const useGetClothes = (form: FormInstance<FormType>, weather?: Weather) => {
  const [loading, setLoading] = useState(false);
  const [data, setDate] = useState<Data>({} as Data);

  const mutation = useMutation({
    mutationFn: () => {
      setLoading(true);
      return fetchClothes();
    },
  });

  useEffect(() => {
    if (weather && mutation.data) {
      const data = filterClothes(mutation.data, form);
      const tempCoef = getCoefTemp(parseKelvinToCelsius(weather.main.feels_like));
      const newData = {} as Data;

      for (const key in data) {
        const dec = decart(data[key as PART_BODY]);
        const sumDec = calcSum(dec);
        const filteredClothes = filterByCoef(sumDec, tempCoef, key as PART_BODY);

        filteredClothes.length > 0 && (newData[key as PART_BODY] = filteredClothes);
      }

      setDate(newData);
      setLoading(false);
    }
  }, [form, mutation.data, weather]);

  return { mutation, loading, data };
};
