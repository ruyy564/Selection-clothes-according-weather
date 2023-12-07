import { GENDER, PART_BODY, PRECIPITATION, TYPE } from './constants';

export type ClothesStyle = {
  id: string;
  name: string;
}[];

export type EmptyClothes = {
  type: 'empty';
  coefficient: 0;
};

export type Clothes = {
  gender: GENDER;
  name: string;
  style: string[];
  age: [number, number];
  type: TYPE;
  partOfBody: PART_BODY[];
  coefficient: number;
  img: string;
};

export type AnyClothes = Clothes | EmptyClothes;

export type FetchWeather = {
  city: string;
};

export type FetchClothes = {
  gender: GENDER;
  age: number;
  styleClothes: string;
};

export type Weather = {
  main: {
    temp: number; // температура, (К)
    feels_like: number; // ощущается как, (К)
  };
  name: string; // город
  weather: [
    {
      main: PRECIPITATION; // тип погоды : дождь, снег
      description: string; // описание
    },
  ];
  sys: {
    country: string; // страна
  };
  wind: {
    speed: number; //скорость ветра, (м/с)
  };
};
