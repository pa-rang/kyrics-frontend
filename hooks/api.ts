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

export const useGetSongData = (id: number | undefined, user?: User | undefined) => {
  const isToken = user ? client : clientWithoutToken;

  const { data } = useSWR<{ data: { data: ISongData } }>(`/song/${id}`, isToken.get);

  return data?.data?.data;
};
// useGetSongData, useGetVocabData을 하나의 함수로 통일하고 싶다.
// Generic 사용법이 아직 익숙하지 않아 어렵다.
// Generic을 조금 더 공부하고 수정하겠다.

export const useGetVocabData = (id: number | undefined, user?: User | undefined) => {
  const isToken = user ? client : clientWithoutToken;

  const { data } = useSWR<KyricsSWRResponse<IMyVocab[]>>(`/song/${id}/vocab`, isToken.get);

  return data?.data?.data;
};
