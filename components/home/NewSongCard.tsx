import styled from '@emotion/styled';
import { getPageLogger } from 'lib/utils/amplitude';
import React from 'react';

const newSongCardLogger = getPageLogger('new_song_card');

function NewSongCard() {
  const requestNewSongUrl = 'https://forms.gle/NF4iTYvfesPZwgGt9';

  return (
    <Wrap>
      <p className="title">
        Missing any song
        <br />
        you’re looking for?
      </p>
      <button
        className="button"
        onClick={() => {
          window.open(requestNewSongUrl, '_blank');
          newSongCardLogger.click('REQUEST_SONG_클릭수');
        }}
      >
        <p className="button__label">Request new songs!</p>
        <img className="button__arrow" src="/assets/icons/icArrow.svg" alt=""></img>
      </button>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background: linear-gradient(158.98deg, #e74e97 3.15%, #6465f4 94.3%);
  width: 360px;
  height: 270px;

  .title {
    margin-top: 62px;
    text-align: center;
    line-height: 120%;
    color: #ffffff;
    font-size: 24px;
    font-weight: bold;
    font-style: normal;

    @media (max-width: 767px) {
      margin-top: 42px;
      font-size: 16px;
    }
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 28px;
    border: none;
    border-radius: 8px;
    background: #ffffff;
    cursor: pointer;
    padding: 10px 16px;
    width: 227px;
    height: 40px;

    &:hover {
      box-shadow: 0px 0px 15px rgba(255, 255, 255, 0.7);
    }

    &__label {
      line-height: 120%;
      font-size: 16px;
      font-weight: bold;
      font-style: normal;

      @media (max-width: 767px) {
        font-size: 10px;
      }
    }

    &__arrow {
      @media (max-width: 767px) {
        width: 15px;
        height: 15px;
      }
    }

    @media (max-width: 767px) {
      margin-top: 30px;
      padding: 0px 16px;
      width: 151px;
      height: 27px;
    }
  }

  @media (max-width: 767px) {
    width: 240px;
    height: 180px;
  }
`;

export default NewSongCard;
