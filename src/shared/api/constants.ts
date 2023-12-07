/* eslint-disable no-unused-vars */
// лимит в 1000 вызовов в день по этому ключу
export const API_KEY = '623e4759750b9fe6cef284dd6c5bf533';

export enum PRECIPITATION {
  Clouds = 'Clouds',
  Rain = 'Rain',
  Snow = 'Snow',
  Haze = 'Haze',
  Smoke = 'Smoke',
  Mist = 'Mist',
  Drizzle = 'Drizzle',
  Clear = 'Clear',
}

export enum GENDER {
  FEMALE = 'female',
  MALE = 'male',
  UNISEX = 'unisex',
}

export enum TYPE {
  LOW = 'low',
  HIGH = 'high',
  MIDDLE = 'middle',
}

export enum PART_BODY {
  BODY = 'body',
  LEGS = 'legs',
  FOOT = 'foot',
  HEAD = 'head',
}
