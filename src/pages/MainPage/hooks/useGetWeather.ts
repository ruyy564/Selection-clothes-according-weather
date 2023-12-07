import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchWeather } from 'shared/api';
import { FetchWeather } from 'shared/api/types';

export const useGetWeather = () => {
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: ({ city }: FetchWeather) => {
      setLoading(true);
      return fetchWeather(city);
    },
    onSuccess: () => {
      setLoading(false);
    },
  });

  return { mutation, loading };
};
