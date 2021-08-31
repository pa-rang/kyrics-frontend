import styled from '@emotion/styled';
import React from 'react';

interface Props {
  handleFontSize: (type: string) => void;
}

function TextSizeController({ handleFontSize }: Props) {
  return (
    <Root>
      <div className="alphabet" />
      <button className="sizeUp" onClick={() => handleFontSize('Up')} />
      <button className="sizeDown" onClick={() => handleFontSize('Down')} />
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
    padding: 0;
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
    cursor: pointer;
    width: 37px;
    height: 26px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
