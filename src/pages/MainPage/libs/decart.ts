import { AnyClothes } from 'shared/api/types';

export const decart = (lists: AnyClothes[][]) => {
  return lists.reduce(
    (acc, list) => acc.map((x) => list.map((y) => x.concat(y))).reduce((acc, list) => acc.concat(list), []),
    [[]] as AnyClothes[][],
  );
};
