import { client, KyricsSWRResponse } from 'lib/api';
import useSWR, { SWRConfiguration } from 'swr';
import { User } from 'types';

export const defaultSWROptions: SWRConfiguration = {
  revalidateOnFocus: false,
  errorRetryCount: 2,
};

export const useGetUser = () => {
  const { data } = useSWR<KyricsSWRResponse<User>>('/user', client.get, defaultSWROptions);

  console.log('data', data);

  return data?.data?.data;
};
