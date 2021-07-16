import axios from 'axios';

export interface KyricsResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface KyricsSWRResponse<T> {
  data: KyricsResponse<T>;
}

export const mockClient = axios.create({ baseURL: 'http://localhost:3005' });
export const client = axios.create({ baseURL: 'https://kyricserver.com' });
export const clientWithToken = (token: string) => {
  const headers = {
    'x-access-token': token,
  };

  return axios.create({ baseURL: 'https://kyricserver.com', headers });
};
