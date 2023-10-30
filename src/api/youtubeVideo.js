import { useQuery } from '@tanstack/react-query';
import apiFetch from '../bundle/axios';
import Qs from 'qs';

export const useFetchYoutubePastor = (params) => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['youtube/pastor'],
    queryFn: async (params) => {
      const _params = Qs.stringify(params, { arrayFormat: 'repeat' });
      console.log(_params);
      const response = await apiFetch.get('/youtube/pastor');
      return response.data.result;
    },
    keepPreviousData: true,
  });
  return { data, isLoading, isError, error };
};
