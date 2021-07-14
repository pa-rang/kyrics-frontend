import Footer from '@components/common/Footer';
import Header from '@components/common/Header';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';

type currentState = 'mySongs' | 'myVocab';
function Collection(): ReactElement {
  const router = useRouter();
  const pid = router.query;
  const [mySongs, setmySongs] = useState<boolean | undefined>();
  const [myVocab, setmyVocab] = useState<boolean | undefined>();

  //localhost:3000/mypage/collection?type=mysongs
  //localhost:3000/mypage/collection?type=myvocab
  const setFirstState = () => {
    console.log(pid);
    if (pid.type === 'mysongs') {
      setmySongs(true);
      setmyVocab(false);
      console.log(pid.type);
    }
    if (pid.type === 'myvocab') {
      setmySongs(false);
      setmyVocab(true);
      console.log(pid.type);
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
        <button
          className="my-song"
          onClick={clickSongs}
          onMouseEnter={mousemySongs}
          onMouseLeave={mouseLeaveSongs}
        >
          My Songs
        </button>
        <button
          className="my-voca"
          onClick={clickVocab}
          onMouseEnter={mousemyVocab}
          onMouseLeave={mouseLeaveVocab}
        >
          My Vocab
        </button>
      </Styled.MyCollection>
      <Footer />
    </Styled.Root>
  );
}

export default Collection;

const Styled = {
  Root: styled.div``,
  MyCollection: styled.div<{
    mySongs: boolean | undefined;
    myVocab: boolean | undefined;
  }>`
    display: flex;
    justify-content: center;
    border-bottom: 2px solid #e1e1e1;
    width: 100%;
    height: 43px;
    button {
      margin-right: 61px;
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
    .my-song {
      ${({ mySongs }) =>
        mySongs &&
        css`
          border-bottom: 4px solid #8c8cff;
          color: #6465f4;
        `}
    }
    .my-voca {
      ${({ myVocab }) =>
        myVocab &&
        css`
          border-bottom: 4px solid #8c8cff;
          color: #6465f4;
        `}
    }
  `,
};
