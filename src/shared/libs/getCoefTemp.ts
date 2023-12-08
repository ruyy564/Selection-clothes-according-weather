const MIN_TEMP = -40;
const MAX_TEMP = 40;

export const DIFF = 5;
export const DIFF_HEAD = 40;
export const DIFF_LEGS = 60;

const k = (MAX_TEMP + Math.abs(MIN_TEMP)) / 100;

export const getCoefTemp = (temp: number) => (MAX_TEMP - temp) / k;
