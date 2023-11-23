import { PRECIPITATION, WEATHER_PERIOD } from './constants';

export type ClothesStyle = {
  key: string;
  name: string;
}[];

export type FetchWeather = {
  city: string;
  weatherPeriod: WEATHER_PERIOD;
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
