// import CopyIcon from '@assets/icons/CopyIcon';
import { CopyIcon, FavoriteIcon, YoutubeIcon } from '@assets/index';
import styled from '@emotion/styled';
import React, { useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const PlayerBtns = () => {
  const copyRef = useRef<HTMLDivElement | null>(null);
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

  const handleCopy = () => {
    copyRef.current && (copyRef.current.style.display = 'flex');
    setTimeout(() => {
      copyRef.current && (copyRef.current.style.display = 'none');
    }, 2000);
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
      <CopyToClipboard text="https://kyrics.vercel.app/" onCopy={handleCopy}>
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
      <div className="copy--msg" ref={copyRef}>
        Copied !
      </div>
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
  .copy--msg {
    display: none;
    position: absolute;
    top: 57px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: red;
    width: 163px;
    height: 41px;
    font-size: 20px;
  }
`;
