import Footer from '@components/common/Footer';
import ArtistCarousel from '@components/home/ArtistCarousel';
import styled from '@emotion/styled';
import Title from 'components/home/Title';
import { client } from 'lib/api';
import React from 'react';
import useSWR from 'swr';

import Header from '../components/common/Header';

function Home() {
  const { data } = useSWR('/artists', client.get);

  console.log('client data', data?.data);

  return (
    <>
      <Header isLoggedIn={true} />
      <Title />
      <ArtistCarousel />
      <Footer />
    </>
  );
}

export default Home;
