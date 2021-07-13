import Footer from '@components/common/Footer';
import Header from '@components/common/Header';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';

type defaultState = 'mySongs' | 'myVocab';
function Collection(): ReactElement {
  const router = useRouter();
  const pid = router.query;
  const [onSongs, setOnSongs] = useState<boolean | undefined>();
  const [onVocab, setOnVocab] = useState<boolean | undefined>();
  const [defaultState, setDefaultState] = useState<defaultState>();
  //localhost:3000/mypage/collection?type=mysongs
  //localhost:3000/mypage/collection?type=myvocab
  const setFirstState = () => {
    if ((pid.type = 'mysongs')) {
      setOnSongs(true);
      setOnVocab(false);
    } else {
      setOnSongs(false);
      setOnVocab(true);
    }
  };

  useEffect(() => {
    setFirstState();
  }, [pid]);

  const mouseOnSongs = () => {
    setOnSongs(true);
    setOnVocab(false);
  };
  const mouseLeaveSongs = () => {
    setOnSongs(false);
    setFirstState();
  };
  const mouseOnVocab = () => {
    setOnVocab(true);
    setOnSongs(false);
  };

  const mouseLeaveVocab = () => {
    setOnVocab(false);
    setFirstState();
  };

  return (
    <Styled.Root>
      <Header isLoggedIn={true} />
      <Styled.MyCollection onSongs={onSongs} onVocab={onVocab}>
        <li className="my-song" onMouseEnter={mouseOnSongs} onMouseLeave={mouseLeaveSongs}>
          My Songs
        </li>
        <li className="my-voca" onMouseEnter={mouseOnVocab} onMouseLeave={mouseLeaveVocab}>
          My Vocab
        </li>
      </Styled.MyCollection>
      <Footer />
    </Styled.Root>
  );
}

export default Collection;

const Styled = {
  Root: styled.div``,
  MyCollection: styled.div<{ onSongs: boolean | undefined; onVocab: boolean | undefined }>`
    display: flex;
    justify-content: center;
    border-bottom: 2px solid #e1e1e1;
    width: 100%;
    height: 43px;
    li {
      margin-right: 61px;
      cursor: pointer;
      padding-right: 17px;
      padding-bottom: 7px;
      padding-left: 17px;
      list-style: none;
      color: #e1e1e1;
      font-family: Poppins;
      font-size: 24px;
      font-weight: bold;
      font-style: normal;
    }
    .my-song {
      ${({ onSongs }) =>
        onSongs &&
        css`
          border-bottom: 4px solid #8c8cff;
          color: #6465f4;
          font-family: Poppins;
          font-size: 24px;
          font-weight: bold;
          font-style: normal;
        `}
    }
    .my-voca {
      ${({ onVocab }) =>
        onVocab &&
        css`
          border-bottom: 4px solid #8c8cff;
          color: #6465f4;
          font-family: Poppins;
          font-size: 24px;
          font-weight: bold;
          font-style: normal;
        `}
    }
  `,
};
