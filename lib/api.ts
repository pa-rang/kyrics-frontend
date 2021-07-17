import axios from 'axios';

import { isServer } from './constants/env';

export interface KyricsResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface KyricsSWRResponse<T> {
  data: KyricsResponse<T>;
}

export const mockClient = axios.create({ baseURL: 'http://localhost:3005' });

export const client = axios.create({
  baseURL: 'https://kyricserver.com',
  headers: {
    'x-access-token': isServer || localStorage.getItem('userToken'),
  },
});

export const clientWithoutToken = axios.create({
  baseURL: 'https://kyricserver.com',
});

