/* eslint-disable jsx-a11y/click-events-have-key-events */
import styled from '@emotion/styled';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { isYoutubeModalOpenedState } from 'states';

interface Props {
  setIsMobileModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileModal({ setIsMobileModalOpened }: Props) {
  const setIsYoutubeModalOpened = useSetRecoilState(isYoutubeModalOpenedState);

  const handleYoutubeClick = () => {
    setIsMobileModalOpened(false);
    setIsYoutubeModalOpened(true);
  };

  return (
    <Styled.Root>
      <Styled.Favorite>
        <div className="favorite">Add to favorite</div>
      </Styled.Favorite>
      <Styled.Share>
        <div className="share">Share</div>
      </Styled.Share>
      <Styled.Youtube>
        <div className="youtube" onClick={handleYoutubeClick}>
          Youtube
        </div>
      </Styled.Youtube>
    </Styled.Root>
  );
}

export default MobileModal;

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background: #f8fafc;
    width: 132px;
    height: 125px;

    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
  `,
  Favorite: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #e1e1e1;
    width: 94px;
    height: 21px;
    .favorite {
      cursor: pointer;
      text-align: center;
      color: #9d9d9d;
      font-family: Noto Sans;
      font-size: 13px;
    }
  `,
  Share: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10.5px;
    border-bottom: 1px solid #e1e1e1;
    width: 94px;
    height: 21px;
    .share {
      cursor: pointer;
      text-align: center;
      color: #9d9d9d;
      font-family: Noto Sans;
      font-size: 13px;
    }
  `,
  Youtube: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10.5px;
    border-bottom: 1px solid #e1e1e1;
    width: 94px;
    height: 21px;
    .youtube {
      cursor: pointer;
      text-align: center;
      color: #9d9d9d;
      font-family: Noto Sans;
      font-size: 13px;
    }
  `,
};
