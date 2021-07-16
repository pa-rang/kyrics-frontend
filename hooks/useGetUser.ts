import { client, KyricsSWRResponse } from 'lib/api';
import useSWR from 'swr';
import { User } from 'types';

const useGetUser = () => {
  const { data } = useSWR<KyricsSWRResponse<User>>('/user', client.get, {
    revalidateOnFocus: false,
    errorRetryCount: 3,
  });

  return data?.data?.data;
};

export default useGetUser;
