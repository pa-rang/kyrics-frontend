// import CopyIcon from '@assets/icons/CopyIcon';
import { CopyIcon, FavoriteIcon, YoutubeIcon } from '@assets/index';
import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import YoutubeModal from './YoutubeModal';

const PlayerBtns = ({ videoId }: { videoId: string }) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const favoriteAddRef = useRef<HTMLDivElement | null>(null);
  const handleMouseEnter = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLImageElement;

    if (target.src === 'assets/icons/onFavorite.svg') return;

    const hoverIcon = `hover${target.className}`;

    target.src = `assets/icons/${hoverIcon}.svg`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLImageElement;
    const Icon = target.className;

    target.src = `assets/icons/${Icon}.svg`;
  };

  const handleCopy = () => {
    copyRef.current && (copyRef.current.style.display = 'flex');
    setTimeout(() => {
      copyRef.current && (copyRef.current.style.display = 'none');
    }, 2000);
  };
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  // data를 받아와서, favortite 초기값을 설정해줄 예정.
  const handleFavorite = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLImageElement;
    const src: string = isFavorite ? 'assets/icons/favorite.svg' : 'assets/icons/onFavorite.svg';

    target.src = src;
    setIsFavorite((isFavorite) => !isFavorite);
    // favorite를 수정하는 put code 추가 예정
    favoriteAddRef.current &&
      (isFavorite
        ? (favoriteAddRef.current.innerText = 'Deleted')
        : (favoriteAddRef.current.innerText = 'Added'));
    favoriteAddRef.current && (favoriteAddRef.current.style.display = 'flex');
    setTimeout(() => {
      favoriteAddRef.current && (favoriteAddRef.current.style.display = 'none');
    }, 2000);
    // 2초뒤에 메시지를 지우는 것으로 했는데, 연속으로 아이콘을 클릭할때 의도한대로 작동하지 않는 문제 발생.
  };

  return (
    <PlayerBtnsWrapper>
      <div className="icon--container">
        <img
          className="FavoriteIcon"
          src={FavoriteIcon.src}
          alt="favorite"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleFavorite}
          aria-hidden="true"
        />
        <div className="favoriteAdd--msg msg" ref={favoriteAddRef}>
          Added
        </div>
      </div>
      <div className="icon--container">
        <CopyToClipboard text="https://kyrics.vercel.app/" onCopy={handleCopy}>
          <img
            className="CopyIcon"
            src={CopyIcon.src}
            alt="copy"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </CopyToClipboard>
        <div className="copy--msg msg" ref={copyRef}>
          Link Copied
        </div>
      </div>

      <img
        className="YoutubeIcon"
        src={YoutubeIcon.src}
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
};

export default PlayerBtns;

const PlayerBtnsWrapper = styled.div`
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
    border-radius: 10px;
    background-color: red;
    width: 90px;
    height: 24px;
    font-size: 12px;
  }
  .favoriteAdd--msg {
    transform: translateX(-25%);
    width: 60px;
  }
`;
