import Footer from '@components/common/Footer';
import Title from 'components/home/Title';
import { client, mockClient } from 'lib/api';
import React from 'react';
import useSWR from 'swr';
import { Artist } from 'types';

import Header from '../components/common/Header';

function Home() {
  // const { data } = useSWR<{ data: Artist[] }>('/artists', mockClient.get);
  const { data } = useSWR('/artists', (url) => client.get(url));

  console.log('data', data);

  return (
    <>
      <Header isLoggedIn={true} />
      <Title />
      <div>안녕하세요.</div>
      <Footer />
    </>
  );
}

export default Home;
