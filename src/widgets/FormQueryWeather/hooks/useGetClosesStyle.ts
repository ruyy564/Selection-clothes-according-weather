import { useQuery } from '@tanstack/react-query';
import { fetchClothesStyle } from 'shared/api';

export const useGetClosesStyle = () => {
  const query = useQuery({ queryKey: ['clothesStyle'], queryFn: fetchClothesStyle });

  return query;
};
