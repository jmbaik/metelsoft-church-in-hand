import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { CKeys } from '../bundle/constants';

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
