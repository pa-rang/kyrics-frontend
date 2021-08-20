import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styled from '@emotion/styled';
import { defaultSWROptions } from 'hooks/api';
import { client, clientWithoutToken, KyricsSWRResponse } from 'lib/api';
import { useRouter } from 'next/router';
import React from 'react';
import Slider, { Settings } from 'react-slick';
import useSWR from 'swr';
import { IMyVocab } from 'types';

import KeyExpressionItem from '../KeyExpression/KeyExpressionItem';

interface ArrowProps {
  className?: string;
  style?: { [key: string]: string };
  onClick?: () => void;
  img?: string;
}

function Arrow({ className, style, onClick, img }: ArrowProps) {
  return (
    <button className={className} style={{ ...style }} onClick={onClick}>
      <img className="arrowImg" src={img} alt=""></img>
    </button>
  );
}

const sliderProps: Settings = {
  arrows: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  prevArrow: <Arrow img={'/assets/icons/icPrevArrow.svg'} />,
  nextArrow: <Arrow img={'/assets/icons/icNextArrow.svg'} />,
};

function MobileKeyExpression() {
  const router = useRouter();
  const {
    query: { id: songId },
  } = router;
  const { data: keyExpressionsData } = useSWR<KyricsSWRResponse<IMyVocab[]>>(
    `/song/${songId}/vocab`,
    clientWithoutToken.get,
    defaultSWROptions,
  );
  const keyExpressions = keyExpressionsData?.data.data;

  return (
    <Styled.Root>
      <Slider {...sliderProps}>
        {keyExpressions?.map(({ id, eng, engExample, kor, korExample, isSaved }) => (
          <KeyExpressionItem
            key={kor}
            type="line-left"
            width="80%"
            eng={eng}
            engExample={engExample}
            kor={kor}
            korExample={korExample}
            isSaved={isSaved}
            styled={{ margin: 'auto' }}
            id={id}
            songId={Number(songId)}
          />
        ))}
      </Slider>
    </Styled.Root>
  );
}

export default MobileKeyExpression;

const Styled = {
  Root: styled.div`
    /* display: flex;
    align-items: center;
    justify-content: center; */
    .slick-arrow {
      position: absolute;
      width: 13px;
      height: 32px;
      ::before {
        content: '';
      }
    }
    .slick-next {
      position: absolute;
      /* top: 50%; */
      right: 8px;
      z-index: 100;
    }

    .slick-prev {
      position: absolute;
      /* top: 50%; */
      left: 10px;
      z-index: 100;
    }
    .arrowImg {
      z-index: 1;
      width: 13px;
      height: 32px;
      /* margin-top: -20px; */
      /* margin-left: -10px; */
    }
  `,
};
