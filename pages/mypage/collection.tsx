import Footer from '@components/common/Footer';
import Header from '@components/common/Header';
import Mysong from '@components/mypage/mysong/Mysong';
import MyVocab from '@components/mypage/myvocab/MyVocab';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { client, mockClient } from 'lib/api';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';

interface StyledProps {
  mySongs: boolean | undefined;
  myVocab: boolean | undefined;
}

function Collection(): ReactElement {
  const router = useRouter();
  const pid = router.query;
  const [mySongs, setMySongs] = useState<boolean | undefined>();
  const [myVocab, setMyVocab] = useState<boolean | undefined>();

  const setFirstState = () => {
    if (pid.type === 'mysongs') {
      setMySongs(true);
      setMyVocab(false);
    }
    if (pid.type === 'myvocab') {
      setMySongs(false);
      setMyVocab(true);
    }
  };

  useEffect(() => {
    setFirstState();
  }, [pid.type]);

  const clickSongs = () => {
    router.push('/mypage/collection?type=mysongs');
  };

  const clickVocab = () => {
    router.push('/mypage/collection?type=myvocab');
  };

  return (
    <>
      <Header />
      <Styled.MyCollection mySongs={mySongs} myVocab={myVocab}>
        <div className="my-collection">
          <button className="my-collection__song" onClick={clickSongs}>
            My Songs
          </button>
          <button className="my-collection__voca" onClick={clickVocab}>
            My Vocab
          </button>
        </div>
      </Styled.MyCollection>
      <Styled.DrawCard>{pid.type === 'mysongs' ? <Mysong /> : <MyVocab />}</Styled.DrawCard>
      <Footer />
    </>
  );
}

export default Collection;

const Styled = {
  MyCollection: styled.div<StyledProps>`
    border-bottom: 2px solid #e1e1e1;
    width: 100%;
    height: 42px;
    button {
      outline: 0;
      border: 0;
      background: transparent;
      cursor: pointer;
      padding-right: 17px;
      padding-bottom: 7px;
      padding-left: 17px;
      color: #e1e1e1;
      font-family: Poppins;
      font-size: 24px;
      font-weight: bold;
      font-style: normal;
      @media (max-width: 768px) {
        font-size: 16px;
      }
    }
    .my-collection {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 43px;
      &__song {
        margin-right: 27px;
        ${({ mySongs }) =>
          mySongs &&
          css`
            border-bottom: 4px solid #8c8cff;
            color: #6465f4;
          `}
      }
      &__voca {
        ${({ myVocab }) =>
          myVocab &&
          css`
            border-bottom: 4px solid #8c8cff;
            color: #6465f4;
          `}
      }
    }
  `,
  DrawCard: styled.div`
    display: flex;
    justify-content: center;
    background: #f9fbfd;
    width: 100%;
  `,
};
