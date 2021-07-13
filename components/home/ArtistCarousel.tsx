import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styled from '@emotion/styled';
import { mockClient } from 'lib/api';
import React, { ReactElement } from 'react';
import Slider, { Settings } from 'react-slick';
import useSWR from 'swr';
import { Artist } from 'types';

import ArtistCard from './ArtistCard';
import NewSongCard from './NewSongCard';
function ArtistCarousel(): ReactElement {
  const { data } = useSWR<{ data: Artist[] }>('/artists', mockClient.get);

  console.log(data?.data);

  const artists = data?.data;

  return (
    <>
      <Styled.Root>
        <Styled.InnerWrap>
          <Slider {...sliderProps}>
            {artists?.map((artist: Artist) => (
              <ArtistCard
                key={artist.id}
                name={artist.name}
                profileImage={artist.profileImageUrl}
                logo={artist.logo}
              />
            ))}
            <NewSongCard />
          </Slider>
        </Styled.InnerWrap>
      </Styled.Root>
    </>
  );
}

const Styled = {
  Root: styled.div`
    display: flex;
    justify-content: center;
    margin-top: -114px;
    margin-bottom: 200px;
    height: 270px;
  `,

  InnerWrap: styled.div`
    /* padding: 0 16px; */
    width: 1200px;
    .slick-list {
      padding: 0 18px !important;
    }

    .slick-arrow {
      &:before {
        color: black;
        /* font-size: 50px; */
      }
    }

    @media (max-width: 1200px) {
      width: 800px;
      .slick-list {
        padding: 0 18px !important;
      }
    }
    @media (max-width: 1030px) {
      width: 400px;

      .slick-list {
        padding: 0 20px !important;
      }
    }
  `,
};

const sliderProps: Settings = {
  arrows: true,
  infinite: true,
  // autoplay: true,
  pauseOnHover: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  dots: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 1030,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default ArtistCarousel;
