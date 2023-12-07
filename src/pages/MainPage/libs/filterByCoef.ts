import { DIFF } from 'shared/libs';
import { FiltredClothes } from '../hooks/useGetClothes';

export const filterByCoef = (list: FiltredClothes[], coefficientCurrentTemp: number) => {
  return list.filter(
    (item) => item.coefficient <= coefficientCurrentTemp + DIFF && item.coefficient >= coefficientCurrentTemp - DIFF,
  );
};
