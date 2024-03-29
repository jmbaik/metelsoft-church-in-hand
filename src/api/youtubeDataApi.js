import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { CKeys } from '../bundle/constants';
import apiFetch from '../bundle/axios';

export const useFetchYoutubeSearchByVid = (youtubeId) => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: [CKeys.youtubeDataQueryKey.search, youtubeId],
    queryFn: async (params) => {
      const response = await axios.get(CKeys.youtubeDataApiUrl.search, {
        params: {
          key: CKeys.YOUTUBE_API_KEY,
          part: 'snippet,contentDetails,statistics',
          id: youtubeId,
        },
      });
      return response?.data?.items ?? [];
    },
    keepPreviousData: true,
    enabled: !!youtubeId,
  });
  return { data, isLoading, isError, error };
};

export const useSaveYoutubeSearchByVid = () => {
  const QueryClient = useQueryClient();
  const { mutate: mutateSaveYoutubeSearch, isLoading: isLoadingYoutubeSearch } =
    useMutation({
      mutationFn: async (params) => {
        console.log('Youtube pastor save useSaveYoutubeSearchByVid');
        const response = await apiFetch.post('/youtube/pastor', params);
        return response.data.result;
      },
      onSuccess: () => {
        QueryClient.invalidateQueries({
          queryKey: ['youtube/pastor'],
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });
  return { mutateSaveYoutubeSearch, isLoadingYoutubeSearch };
};
