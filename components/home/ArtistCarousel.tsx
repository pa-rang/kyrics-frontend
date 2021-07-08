import styled from '@emotion/styled';
import React, { ReactElement } from 'react';

import ArtistCard from './ArtistCard';

function ArtistCarousel(): ReactElement {
  return (
    <ArtistCard
      name={'BTS'}
      profileImage={
        'https://img0.yna.co.kr/etc/inner/EN/2021/06/16/AEN20210616005400315_01_i_P2.jpg'
      }
      logo={'https://1000logos.net/wp-content/uploads/2018/03/BTS_Logo.png'}
    />
  );
}

export default ArtistCarousel;
