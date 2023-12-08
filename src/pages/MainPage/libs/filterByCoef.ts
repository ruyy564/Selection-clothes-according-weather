import { DIFF, DIFF_FOOT, DIFF_HEAD, DIFF_LEGS } from 'shared/libs';
import { PART_BODY } from 'shared/api/constants';
import { FiltredClothes } from '../hooks/useGetClothes';

export const filterByCoef = (list: FiltredClothes[], coefficientCurrentTemp: number, key: PART_BODY) => {
  return list.filter((item) => {
    const notEmpty = item.clothes.find((i) => i.type !== 'empty');

    if (!notEmpty) {
      return;
    }
    if (key === PART_BODY.BODY) {
      return item.coefficient <= coefficientCurrentTemp + DIFF && item.coefficient >= coefficientCurrentTemp - DIFF;
    }

    if (key === PART_BODY.HEAD) {
      return item.coefficient >= coefficientCurrentTemp - DIFF_HEAD && item.coefficient < coefficientCurrentTemp;
    }

    if (key === PART_BODY.LEGS) {
      console.log(item, coefficientCurrentTemp);
      return item.coefficient >= coefficientCurrentTemp - DIFF_LEGS && item.coefficient < coefficientCurrentTemp;
    }
    if (key === PART_BODY.FOOT) {
      console.log(item, coefficientCurrentTemp);
      return item.coefficient >= coefficientCurrentTemp - DIFF_FOOT && item.coefficient < coefficientCurrentTemp;
    }
  });
};
