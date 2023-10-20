import { useQuery } from '@tanstack/react-query';
import apiFetch from '../bundle/axios';

export const areaCodeApi = async () => {
  const response = await apiFetch.get('/common-code/area-code');
  return response.data.result;
};

export const useFetchAreaCode = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['common-code/area-code-list'],
    queryFn: async () => {
      const response = await apiFetch.get('/common-code/area-code');
      return response.data.result;
    },
    keepPreviousData: true,
  });
  return { data, isLoading, isError, error };
};

export const useFetchChurchCode = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['common-code/church-code-list'],
    queryFn: async () => {
      const response = await apiFetch.get('/common-code/church-code');
      return response.data.result;
    },
    keepPreviousData: true,
  });
  return { data, isLoading, isError, error };
};
