import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { withTheme } from '@emotion/react';
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

interface ArrowProps {
  className: any;
  style: any;
  onClick: any;
  img: any;
}

function Arrow(props: any) {
  const { className, style, onClick, img } = props;

  return (
    <button className={className} style={{ ...style }} onClick={onClick}>
      <img className="arrowImg" src={img} alt=""></img>
    </button>
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
    width: 1200px;
    .slick-list {
      padding: 0 18px !important;
    }

    .slick-arrow {
      &:before {
        position: absolute;
        width: 21px;
        height: 50px;
      }
    }

    .arrowImg {
      position: absolute;
      z-index: 1;
      margin-top: -20px;
      margin-left: -10px;
    }

    @media (max-width: 1200px) {
      width: 800px;
      .slick-list {
        padding: 0 18px !important;
      }
    }
    @media (max-width: 900px) {
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
  prevArrow: <Arrow img={'/assets/icons/icPrevArrow.svg'} />,
  nextArrow: <Arrow img={'/assets/icons/icNextArrow.svg'} />,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default ArtistCarousel;
