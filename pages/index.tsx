import Footer from '@components/common/Footer';
import ArtistCarousel from '@components/home/ArtistCarousel';
import styled from '@emotion/styled';
import Title from 'components/home/Title';
import React from 'react';

import Header from '../components/common/Header';

function Home() {
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
