import { useQuery } from '@tanstack/react-query';
import { fetchClosesStyle } from 'shared/api';

export const useGetClosesStyle = () => {
  const query = useQuery({ queryKey: ['closesStyle'], queryFn: fetchClosesStyle });

  return query;
};
