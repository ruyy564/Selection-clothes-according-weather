import axios, { AxiosResponse } from 'axios';
import { ClothesStyle, Weather } from './types';
import { API_KEY, WEATHER_PERIOD } from './constants';

// настройки приложения
const instanceSettingApp = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 1000,
});

// условно-бесплатное api погоды
const instanceWeather = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
  timeout: 60000,
});

const interceptorsResponse = (response: AxiosResponse) => response.data;

instanceSettingApp.interceptors.response.use(interceptorsResponse);
instanceWeather.interceptors.response.use(interceptorsResponse);

export const fetchClosesStyle = () => {
  return instanceSettingApp.get<undefined, ClothesStyle>('clothesStyle');
};

export const fetchWeather = (city: string, weatherPeriod: WEATHER_PERIOD) => {
  return instanceWeather.get<undefined, Weather>(`?q=${city}&exclude=${weatherPeriod}&appid=${API_KEY}`);
};
