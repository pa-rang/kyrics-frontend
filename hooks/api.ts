import { client, KyricsSWRResponse } from 'lib/api';
import { useRouter } from 'next/router';
import useSWR, { SWRConfiguration } from 'swr';
import { ISongData, User } from 'types';

export const defaultSWROptions: SWRConfiguration = {
  revalidateOnFocus: false,
  errorRetryCount: 2,
};

export const useGetUser = () => {
  const { data } = useSWR<KyricsSWRResponse<User>>('/user', client.get, defaultSWROptions);

  return data?.data?.data;
};

export const useGetSongData = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const { data } = useSWR<{ data: { data: ISongData } }>(`/song/${id}`, client.get);

  return data?.data?.data;
};
