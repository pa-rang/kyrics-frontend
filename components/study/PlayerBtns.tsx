// import CopyIcon from '@assets/icons/CopyIcon';
import LoginModal from '@components/common/LoginModal';
import styled from '@emotion/styled';
import { useGetUser } from 'hooks/api';
import { client } from 'lib/api';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoginModalOpenedState, isYoutubeModalOpenedState, songDataState } from 'states';
import { mutate } from 'swr';

interface Props {
  setIsMobileModalOpened?: React.Dispatch<React.SetStateAction<boolean>>;
}

function PlayerBtns({ setIsMobileModalOpened }: Props) {
  const setIsYoutubeModalOpened = useSetRecoilState(isYoutubeModalOpenedState);
  const [isFavorite, setIsFavorite] = useState(false);
  // data를 받아와서, favorite 초기값을 설정해줄 예정.
  const [isFavoriteMsgOpen, setIsFavoriteMsgOpen] = useState(false);
  const [isCopyMsgOpen, setIsCopyMsgOpen] = useState(false);
  const songData = useRecoilValue(songDataState);
  const [onFavorite, setOnFavorite] = useState<'on' | ''>('');
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const user = useGetUser();

  const isSaved = songData?.isSaved;

  console.log('isSaved', isSaved);

  // useEffect(() => {
  //   const isSaved = songData?.isSaved;

  //   console.log('songData', songData);

  //   setIsFavorite(isSaved);
  //   isSaved ? setOnFavorite('on') : setOnFavorite('');
  // }, [songData?.isSaved]);

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
    // setIsMobileModalOpened(false);
    setTimeout(() => {
      setIsCopyMsgOpen(false);
    }, 2000);
  };
  const setIsLoginModalOpened = useSetRecoilState(isLoginModalOpenedState);
  const handleFavorite = () => {
    if (!user) {
      setIsLoginModalOpened(true);
      setIsMobileModalOpened && setIsMobileModalOpened(false);

      return;
    }

    // isFavorite ? setOnFavorite('') : setOnFavorite('on');
    if (!isSaved) {
      setIsFavoriteMsgOpen(true);
      setTimeout(() => {
        setIsFavoriteMsgOpen(false);
      }, 2000);
      client
        .post(`user/song/${id}`)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      client
        .delete(`user/song/${id}`)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    mutate(`/song/${id}`);
    // setIsFavorite((isFavorite) => !isFavorite);
    // favorite를 수정하는 put code 추가 예정
  };
  const handleYoutubeClick = () => {
    setIsMobileModalOpened && setIsMobileModalOpened(false);
    setIsYoutubeModalOpened(true);
  };

  return (
    <PlayerBtnsWrapper isFavoriteMsgOpen={isFavoriteMsgOpen} isCopyMsgOpen={isCopyMsgOpen}>
      <div className="icon--container">
        <img
          className="FavoriteIcon"
          // src={`/assets/icons/${onFavorite}FavoriteIcon.svg`}
          // src={`/assets/icons/${onFavorite}FavoriteIcon.svg`}
          src={isSaved ? '/assets/icons/onFavoriteIcon.svg' : '/assets/icons/FavoriteIcon.svg'}
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
