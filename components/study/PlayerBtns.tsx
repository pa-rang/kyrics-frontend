// import CopyIcon from '@assets/icons/CopyIcon';
import { CopyIcon, FavoriteIcon, YoutubeIcon } from '@assets/index';
import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const PlayerBtns = () => {
  const handleMouseEnter = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLImageElement;
    const hoverIcon = `hover${target.className}`;

    target.src = `assets/icons/${hoverIcon}.svg`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLImageElement;
    const Icon = target.className;

    target.src = `assets/icons/${Icon}.svg`;
  };

  return (
    <PlayerBtnsWrapper>
      <img
        className="FavoriteIcon"
        src={FavoriteIcon.src}
        alt="favorite"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <CopyToClipboard text="https://kyrics.vercel.app/" onCopy={() => console.log('copied')}>
        <img
          className="CopyIcon"
          src={CopyIcon.src}
          alt="copy"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </CopyToClipboard>
      <img
        className="YoutubeIcon"
        src={YoutubeIcon.src}
        alt="youtube"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <div className="copy--msg">Copied !</div>
    </PlayerBtnsWrapper>
  );
};

export default PlayerBtns;

const PlayerBtnsWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  margin-top: 10rem;
  img:hover {
    color: #6465f4;
  }
  .CopyIcon {
    margin: 0 2.5rem;
  }
  .copy--msg {
    display: flex;
    position: absolute;
    top: 5.7rem;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: red;
    width: 16.3rem;
    height: 4.1rem;
    font-size: 2rem;
  }
`;
