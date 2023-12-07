/* eslint-disable no-unused-vars */
import { FormInstance } from 'antd';
import { AnyClothes, Clothes, EmptyClothes } from 'shared/api/types';
import { PART_BODY, TYPE } from 'shared/api/constants';
import { FormType } from '../ui/MainPage';

export type Reducer = { [key in PART_BODY]: AnyClothes[][] };

const emptyClothes: EmptyClothes = {
  coefficient: 0,
  type: 'empty',
};

export const filterClothes = (clothes: Clothes[], form: FormInstance<FormType>) => {
  const formValue = form.getFieldsValue();
  const result = clothes.reduce(
    (acc, item) => {
      if (!item.style.includes(formValue.styleClothes)) {
        return acc;
      }

      if (!(item.age[0] <= formValue.age && item.age[1] >= formValue.age)) {
        return acc;
      }

      if (item.gender !== formValue.gender) {
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
