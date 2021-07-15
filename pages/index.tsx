import Footer from '@components/common/Footer';
import ArtistCarousel from '@components/home/ArtistCarousel';
import Title from 'components/home/Title';
import { client } from 'lib/api';
import React from 'react';
import useSWR from 'swr';
import { Artist } from 'types';

import Header from '../components/common/Header';

function Home() {
  const { data } = useSWR<{ data: Artist[] }>('/artists', client.get);

  console.log('client data', data?.data);

  return (
    <>
      <Header isLoggedIn={false} />
      <Title />
      <ArtistCarousel />
      <Footer />
    </>
  );
}

export default Home;
