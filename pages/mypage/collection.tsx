import Footer from '@components/common/Footer';
import Header from '@components/common/Header';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';

interface StyledProps {
  mySongs: boolean | undefined;
  myVocab: boolean | undefined;
}
function Collection(): ReactElement {
  const router = useRouter();
  const pid = router.query;
  const [mySongs, setmySongs] = useState<boolean | undefined>();
  const [myVocab, setmyVocab] = useState<boolean | undefined>();

  const setFirstState = () => {
    console.log(pid);
    if (pid.type === 'mysongs') {
      setmySongs(true);
      setmyVocab(false);
    }
    if (pid.type === 'myvocab') {
      setmySongs(false);
      setmyVocab(true);
    }
  };

  useEffect(() => {
    setFirstState();
  }, [pid.type]);

  const mousemySongs = () => {
    setmySongs(true);
    setmyVocab(false);
  };
  const mouseLeaveSongs = () => {
    setmySongs(false);
    setFirstState();
  };
  const mousemyVocab = () => {
    setmyVocab(true);
    setmySongs(false);
  };

  const mouseLeaveVocab = () => {
    setmyVocab(false);
    setFirstState();
  };

  const clickSongs = () => {
    router.push('/mypage/collection?type=mysongs');
  };

  const clickVocab = () => {
    router.push('/mypage/collection?type=myvocab');
  };

  return (
    <Styled.Root>
      <Header isLoggedIn={true} />
      <Styled.MyCollection mySongs={mySongs} myVocab={myVocab}>
        <div className="my-collection">
          <button
            className="my-collection__song"
            onClick={clickSongs}
            onMouseEnter={mousemySongs}
            onMouseLeave={mouseLeaveSongs}
          >
            My Songs
          </button>
          <button
            className="my-collection__voca"
            onClick={clickVocab}
            onMouseEnter={mousemyVocab}
            onMouseLeave={mouseLeaveVocab}
          >
            My Vocab
          </button>
        </div>
      </Styled.MyCollection>
      <Footer />
    </Styled.Root>
  );
}

export default Collection;

const Styled = {
  Root: styled.div``,
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
};
