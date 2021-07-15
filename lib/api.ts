import axios from 'axios';

export const mockClient = axios.create({ baseURL: 'http://localhost:3005' });
export const client = axios.create({
  baseURL: 'http://kyrics-test-env.eba-kez2mzcm.ap-northeast-2.elasticbeanstalk.com/login',
});
