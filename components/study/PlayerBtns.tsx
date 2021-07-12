// import CopyIcon from '@assets/icons/CopyIcon';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import YoutubeModal from './YoutubeModal';

interface Props {
  videoId?: string;
}

function PlayerBtns({ videoId }: Props) {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  // data를 받아와서, favorite 초기값을 설정해줄 예정.
  const [isFavoriteMsgOpen, setIsFavoriteMsgOpen] = useState(false);
  const [isCopyMsgOpen, setIsCopyMsgOpen] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLImageElement;

    if (target.src.includes('assets/icons/onFavorite.svg')) return;

    const hoverIcon = `hover${target.className}`;

    target.src = `assets/icons/${hoverIcon}.svg`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLImageElement;
    const Icon = target.className;

    if (target.src.includes('assets/icons/onFavorite.svg')) return;
    target.src = `assets/icons/${Icon}.svg`;
  };

  const handleCopy = () => {
    setIsCopyMsgOpen(true);
    setTimeout(() => {
      setIsCopyMsgOpen(false);
    }, 2000);
  };
  const handleFavorite = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLImageElement;
    const src: string = isFavorite
      ? 'assets/icons/FavoriteIcon.svg'
      : 'assets/icons/onFavorite.svg';

    target.src = src;
    if (!isFavorite) {
      setIsFavoriteMsgOpen(true);
      setTimeout(() => {
        setIsFavoriteMsgOpen(false);
      }, 2000);
    }

    setIsFavorite((isFavorite) => !isFavorite);
    // favorite를 수정하는 put code 추가 예정
  };

  return (
    <PlayerBtnsWrapper isFavoriteMsgOpen={isFavoriteMsgOpen} isCopyMsgOpen={isCopyMsgOpen}>
      <div className="icon--container">
        <img
          className="FavoriteIcon"
          src="assets/icons/FavoriteIcon.svg"
          alt="favorite"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleFavorite}
          aria-hidden="true"
        />
        <div className="favoriteAdd--msg msg">Added</div>
      </div>
      <div className="icon--container">
        <CopyToClipboard text="https://kyrics.vercel.app/" onCopy={handleCopy}>
          <img
            className="CopyIcon"
            src="assets/icons/CopyIcon.svg"
            alt="copy"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </CopyToClipboard>
        <div className="copy--msg msg">Link Copied</div>
      </div>

      <img
        className="YoutubeIcon"
        src="assets/icons/YoutubeIcon.svg"
        alt="youtube"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsModalOpened(true)}
        aria-hidden="true"
      />
      <YoutubeModal
        videoId={videoId}
        isModalOpened={isModalOpened}
        setIsModalOpened={setIsModalOpened}
      />
    </PlayerBtnsWrapper>
  );
}

export default PlayerBtns;

const PlayerBtnsWrapper = styled.div<{ isFavoriteMsgOpen: boolean; isCopyMsgOpen: boolean }>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  img:hover {
    color: #6465f4;
  }
  .CopyIcon {
    margin: 0 25px;
  }
  .icon--container {
    position: relative;
  }
  .msg {
    display: none;
    position: absolute;
    top: 45px;
    align-items: center;
    justify-content: center;
    opacity: 0.8;
    border-radius: 10px;
    background-color: #f6f6f6;
    width: 90px;
    height: 24px;
    font-size: 12px;
  }
  .copy--msg {
    display: ${({ isCopyMsgOpen }) => (isCopyMsgOpen ? 'flex' : 'none')};
  }
  .favoriteAdd--msg {
    display: ${({ isFavoriteMsgOpen }) => (isFavoriteMsgOpen ? 'flex' : 'none')};
    transform: translateX(-25%);
    width: 60px;
  }
`;
