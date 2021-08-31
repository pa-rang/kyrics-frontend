import styled from '@emotion/styled';
import React from 'react';

interface Props {
  handleSize: (type: string) => void;
}

function TextSizeController({ handleSize }: Props) {
  return (
    <Root>
      <img className="alphabet" src="/assets/icons/Alphabet.svg" alt="" />
      <img
        className="sizeUp"
        src="/assets/icons/sizeUp.svg"
        alt=""
        onClick={() => handleSize('Up')}
        aria-hidden="true"
      />
      <img
        className="sizeDown"
        src="/assets/icons/sizeDown.svg"
        alt=""
        onClick={() => handleSize('Down')}
        aria-hidden="true"
      />
    </Root>
  );
}

export default TextSizeController;

const Root = styled.div`
  position: absolute;
  top: 136px;
  left: 41px;
  .alphabet {
    margin-right: 7px;
  }
  .sizeUp,
  .sizeDown {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
