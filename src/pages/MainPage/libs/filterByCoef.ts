import { DIFF, DIFF_HEAD, DIFF_LEGS } from 'shared/libs';
import { PART_BODY } from 'shared/api/constants';
import { FiltredClothes } from '../hooks/useGetClothes';

export const filterByCoef = (list: FiltredClothes[], coefficientCurrentTemp: number, key: PART_BODY) => {
  return list.filter((item) => {
    if (key === PART_BODY.BODY) {
      return item.coefficient <= coefficientCurrentTemp + DIFF && item.coefficient >= coefficientCurrentTemp - DIFF;
    }

    if (key === PART_BODY.HEAD) {
      return item.coefficient >= coefficientCurrentTemp - DIFF_HEAD && item.coefficient < coefficientCurrentTemp;
    }

    if (key === PART_BODY.LEGS || key === PART_BODY.FOOT) {
      return item.coefficient >= coefficientCurrentTemp - DIFF_LEGS && item.coefficient < coefficientCurrentTemp;
    }
  });
};
