import Footer from '@components/common/Footer';
import ArtistCarousel from '@components/home/ArtistCarousel';
import Title from 'components/home/Title';
import { getPageLogger } from 'lib/utils/amplitude';
import React, { useEffect } from 'react';

import Header from '../components/common/Header';

const homePageLogger = getPageLogger('메인페이지');

function Home() {
  useEffect(() => {
    homePageLogger.view();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Title />
        <ArtistCarousel />
      </main>
      <Footer />
    </>
  );
}

export default Home;
