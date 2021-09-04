// import CopyIcon from '@assets/icons/CopyIcon';
import styled from '@emotion/styled';
import { useGetSongData, useGetUser } from 'hooks/api';
import { client } from 'lib/api';
import { getPageLogger } from 'lib/utils/amplitude';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSetRecoilState } from 'recoil';
import { isLoginModalOpenedState, isYoutubeModalOpenedState } from 'states';
import { mutate } from 'swr';

interface Props {
  setIsMobileModalOpened?: React.Dispatch<React.SetStateAction<boolean>>;
}

const playerBtnsLogger = getPageLogger('player_btns');

function PlayerBtns({ setIsMobileModalOpened }: Props) {
  const setIsYoutubeModalOpened = useSetRecoilState(isYoutubeModalOpenedState);

  const [isFavoriteMsgOpen, setIsFavoriteMsgOpen] = useState(false);
  const [isCopyMsgOpen, setIsCopyMsgOpen] = useState(false);
  const router = useRouter();
  const id = Number(router.query.id);
  const user = useGetUser();
  const songData = useGetSongData(id, user);
  const isSaved = songData?.isSaved;

  const handleMouseEnter = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLImageElement;

    if (target.src.includes('Favorite') && isSaved) return;
    const hoverIcon = `hover${target.className}`;

    target.src = `/assets/icons/${hoverIcon}.svg`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLImageElement;

    if (target.src.includes('Favorite') && isSaved) return;
    const Icon = target.className;

    target.src = `/assets/icons/${Icon}.svg`;
  };

  const handleCopy = () => {
    setIsCopyMsgOpen(true);
    playerBtnsLogger.click('SHARE_버튼_클릭수', {
      아티스트_이름: songData?.artist,
      노래_제목: songData?.title,
    });

    setTimeout(() => {
      setIsCopyMsgOpen(false);
    }, 2000);
  };
  const setIsLoginModalOpened = useSetRecoilState(isLoginModalOpenedState);
  const handleFavorite = async () => {
    if (!user) {
      setIsLoginModalOpened(true);
      setIsMobileModalOpened && setIsMobileModalOpened(false);

      return;
    }

    if (!isSaved) {
      setIsFavoriteMsgOpen(true);
      setTimeout(() => {
        setIsFavoriteMsgOpen(false);
      }, 2000);
      await client.post(`user/song/${id}`);
    } else {
      await client.delete(`user/song/${id}`);
    }

    mutate(`/song/${id}`);
  };
  const handleYoutubeClick = () => {
    setIsMobileModalOpened && setIsMobileModalOpened(false);
    setIsYoutubeModalOpened(true);
    playerBtnsLogger.click('유튜브_버튼_클릭수', {
      아티스트_이름: songData?.artist,
      노래_제목: songData?.title,
    });
  };

  return (
    <PlayerBtnsWrapper isFavoriteMsgOpen={isFavoriteMsgOpen} isCopyMsgOpen={isCopyMsgOpen}>
      <div className="icon--container">
        <img
          className="FavoriteIcon"
          src={`/assets/icons/${isSaved ? 'on' : ''}FavoriteIcon.svg`}
          alt="favorite"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleFavorite}
          aria-hidden="true"
        />
        <div className="favoriteAdd--msg msg">Added</div>
      </div>
      <div className="icon--container">
        <CopyToClipboard text={`https://www.kyrics.org/${router.asPath}`} onCopy={handleCopy}>
          <img
            className="CopyIcon"
            src="/assets/icons/CopyIcon.svg"
            alt="copy"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </CopyToClipboard>
        <div className="copy--msg msg">Link Copied</div>
      </div>
      <img
        className="YoutubeIcon"
        src="/assets/icons/YoutubeIcon.svg"
        alt="youtube"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleYoutubeClick}
        aria-hidden="true"
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
  img {
    cursor: pointer;
  }
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
  @media (max-width: 900px) {
    display: none;
  }
  @media (max-width: 415px) {
    display: flex;
  }
`;
