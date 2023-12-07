import { AnyClothes } from 'shared/api/types';

export const calcSum = (lists: AnyClothes[][]) =>
  lists.map((list) =>
    list.reduce(
      (acc, item) => {
        acc.clothes.push(item);
        acc.coefficient += item.coefficient;
        return acc;
      },
      {
        clothes: [] as AnyClothes[],
        coefficient: 0,
      },
    ),
  );
