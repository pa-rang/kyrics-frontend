import styled from '@emotion/styled';
import React, { ReactElement } from 'react';

function NewSongCard(): ReactElement {
  return (
    <Wrap>
      <p className="title">
        Missing any song
        <br />
        you’re looking for?
      </p>
      <button className="button">
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
  }

  .button {
    display: flex;
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
    }

    &__arrow {
    }
  }
`;

export default NewSongCard;
