import styled from '@emotion/styled';
import React from 'react';

interface Props {
  handleSize: (type: string) => void;
}

function TextSizeController({ handleSize }: Props) {
  return (
    <Root>
      <div className="alphabet" />
      <button className="sizeUp" onClick={() => handleSize('Up')} />
      <button className="sizeDown" onClick={() => handleSize('Down')} />
    </Root>
  );
}

export default TextSizeController;

const Root = styled.div`
  display: flex;
  position: absolute;
  top: 136px;
  left: 41px;
  button {
    outline: 0;
    border: 0;
  }
  .alphabet {
    margin-right: 7px;
    background-image: url(/assets/icons/Alphabet.svg);
    width: 26px;
    height: 26px;
  }
  .sizeUp {
    background-image: url(/assets/icons/sizeUp.svg);
  }
  .sizeDown {
    background-image: url(/assets/icons/sizeDown.svg);
  }
  .sizeUp,
  .sizeDown {
    width: 36px;
    height: 27px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
