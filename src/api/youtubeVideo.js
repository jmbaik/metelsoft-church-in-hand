import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiFetch from '../bundle/axios';

export const useFetchYoutubePastor = (params) => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['youtube/pastor'],
    queryFn: async (params) => {
      const response = await apiFetch.get('/youtube/pastor', params);
      return response.data.result;
    },
    keepPreviousData: true,
  });
  return { data, isLoading, isError, error };
};

export const useSaveYoutubePastor = () => {
  const QueryClient = useQueryClient();
  const {
    mutate: mutateSaveYoutubePastor,
    isLoading: saveYoutubePastorLoading,
  } = useMutation({
    mutationFn: async (params) => {
      console.log('youtube pastor useSaveYoutubePastor', params);
      let response = {};
      if (params?.pastorCode) {
        response = await apiFetch.put('/youtube/pastor', params);
        return response.data.result;
      } else {
        response = await apiFetch.post('/youtube/pastor', params);
        return response.data.result;
      }
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: ['/youtube/pastor'],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { mutateSaveYoutubePastor, saveYoutubePastorLoading };
};

export const useFetchOriginVid = (params) => {
  const {
    isLoading: isLoadingOriginVid,
    data: dataOriginVid,
    isError: isErrorOriginVid,
    error: errorOriginVid,
  } = useQuery({
    queryKey: ['youtube/origin-vid'],
    queryFn: async (params) => {
      const response = await apiFetch.get('youtube/origin-vid', params);
      return response.data.result;
    },
    keepPreviousData: true,
  });
  return {
    dataOriginVid,
    isLoadingOriginVid,
    isErrorOriginVid,
    errorOriginVid,
  };
};

export const useSaveOriginVid = () => {
  const QueryClient = useQueryClient();
  const { mutate: mutateSaveOriginVid, isLoading: saveOriginVidLoading } =
    useMutation({
      mutationFn: async (params) => {
        console.log('OriginVid useSaveOriginVid', params);
        let response = {};
        if (params?.pastorCode) {
          response = await apiFetch.put('/youtube/origin-vid', params);
          return response.data.result;
        } else {
          response = await apiFetch.post('/youtube/origin-vid', params);
          return response.data.result;
        }
      },
      onSuccess: () => {
        QueryClient.invalidateQueries({
          queryKey: ['/youtube/origin-vid'],
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });
  return { mutateSaveOriginVid, saveOriginVidLoading };
};
