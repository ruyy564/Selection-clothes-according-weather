import axios, { AxiosResponse } from 'axios';
import { Clothes, ClothesStyle, Weather } from './types';
import { API_KEY } from './constants';

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

export const fetchClothesStyle = () => {
  return instanceSettingApp.get<undefined, ClothesStyle>('clothesStyle');
};

export const fetchClothes = () => {
  return instanceSettingApp.get<undefined, Clothes[]>(`clothes`);
};

export const fetchWeather = (city: string) => {
  return instanceWeather.get<undefined, Weather>(`?q=${city}&exclude=current&appid=${API_KEY}`);
};
