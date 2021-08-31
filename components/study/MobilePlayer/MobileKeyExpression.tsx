import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styled from '@emotion/styled';
import { useGetUser, useGetVocabData } from 'hooks/api';
import { colors } from 'lib/constants/colors';
import { useRouter } from 'next/router';
import React from 'react';
import Slider, { Settings } from 'react-slick';
import { useRecoilValue } from 'recoil';
import { widthAtom } from 'states';

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
  const width = useRecoilValue(widthAtom);
  const router = useRouter();
  const {
    query: { id: songId },
  } = router;
  const user = useGetUser();
  const keyExpressions = useGetVocabData(songId, user);

  return (
    <Styled.Root width={width}>
      <Slider {...sliderProps}>
        {keyExpressions?.map(({ id, eng, engExample, kor, korExample, isSaved }) => (
          <KeyExpressionItem
            key={kor}
            type="line-left"
            width="100%"
            small={true}
            eng={eng}
            engExample={engExample}
            kor={kor}
            korExample={korExample}
            isSaved={isSaved}
            styled={{ margin: 'auto', height: '108px' }}
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
  Root: styled.div<{ width: number }>`
    position: fixed;
    bottom: 60px;
    left: 0;
    z-index: 100000;
    background-color: ${colors.gray2};
    padding: 11px 0;
    width: 100%;
    height: 130px;
    .slick-slide {
      padding: 0px ${({ width }) => (141 * width) / 1440}px;
      height: 108px;
    }
    .slick-list {
      /* z-index: 100000; */
    }

    .slick-arrow {
      position: absolute;
      z-index: 100001;
      width: 13px;
      height: 32px;
      ::before {
        content: '';
      }
    }
    .slick-next {
      position: absolute;
      right: 8px;
    }

    .slick-prev {
      position: absolute;
      left: 10px;
    }
    .arrowImg {
      width: 13px;
      height: 32px;
    }
  `,
};
