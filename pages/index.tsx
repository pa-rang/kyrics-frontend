import Footer from '@components/common/Footer';
import ArtistCarousel from '@components/home/ArtistCarousel';
import Title from 'components/home/Title';
import React from 'react';

import Header from '../components/common/Header';

function Home() {
  return (
    <>
      <Header />
      <Title />
      <ArtistCarousel />
      <Footer />
    </>
  );
}

export default Home;
