import ArtistCarousel from '@components/home/ArtistCarousel';
import Title from 'components/home/Title';
import { mockClient } from 'lib/api';
import React from 'react';
import useSWR from 'swr';
import { Artist } from 'types';

import Header from '../components/common/Header';

function Home() {
  const { data } = useSWR<{ data: Artist[] }>('/artists', mockClient.get);

  console.log('data', data?.data);

  return (
    <>
      <Header isLoggedIn={true} />
      <Title />
      <ArtistCarousel />
    </>
  );
}

export default Home;
