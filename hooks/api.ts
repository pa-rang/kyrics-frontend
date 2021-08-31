import { client, clientWithoutToken, KyricsSWRResponse } from 'lib/api';
import { useRouter } from 'next/router';
import useSWR, { SWRConfiguration } from 'swr';
import { IMyVocab, ISongData, User } from 'types';

export const defaultSWROptions: SWRConfiguration = {
  revalidateOnFocus: false,
  errorRetryCount: 2,
};

export const useGetUser = () => {
  const { data } = useSWR<KyricsSWRResponse<User>>('/user', client.get, defaultSWROptions);

  return data?.data?.data;
};

export const useGetSongData = (id: string | string[] | undefined, user?: User | undefined) => {
  const isToken = user ? client : clientWithoutToken;

  const { data } = useSWR<{ data: { data: ISongData } }>(`/song/${id}`, isToken.get);

  return data?.data?.data;
};

export const useGetVocabData = (id: string | string[] | undefined, user?: User | undefined) => {
  const isToken = user ? client : clientWithoutToken;

  const { data } = useSWR<KyricsSWRResponse<IMyVocab[]>>(`/song/${id}/vocab`, isToken.get);

  return data?.data?.data;
};
