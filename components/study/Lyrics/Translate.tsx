import styled from '@emotion/styled';
import React from 'react';

interface Props {
  engTranslated: boolean;
  setEngTranslated: React.Dispatch<React.SetStateAction<boolean>>;
  isDropDown: boolean;
  setIsDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

function Translate({ engTranslated, setEngTranslated, isDropDown, setIsDropDown }: Props) {
  return (
    <Styled.Root onClick={() => setIsDropDown((isDropDown) => !isDropDown)}>
      {engTranslated ? 'English' : 'Translate'}
      <Styled.DropDownIcon />
      {isDropDown && (
        <Styled.DropDown engTranslated={engTranslated}>
          <div onClick={() => setEngTranslated(false)}>None</div>
          <div onClick={() => setEngTranslated(true)}>English</div>
        </Styled.DropDown>
      )}
    </Styled.Root>
  );
}

export default Translate;

const Styled = {
  Root: styled.div`
    display: flex;
    position: absolute;
    top: 136px;
    right: 39px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: #6465f4;
    cursor: pointer;
    width: 132px;
    height: 43px;
    color: #ffffff;
    font-size: 16px;

    @media (max-width: 768px) {
      top: 71px;
      right: 20px;
      width: 84px;
      height: 25px;
      font-size: 10px;
    }
  `,
  DropDownIcon: styled.div`
    margin-left: 8px;
    background-image: url(/assets/icons/dropDownIcon.svg);
    width: 10px;
    height: 7px;
  `,
  DropDown: styled.div<{ engTranslated: boolean }>`
    display: flex;
    position: absolute;
    top: 49px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
    border-radius: 10px;
    box-shadow: 3px 3px 7px 4px #6262621f;
    background-color: #f8fafc;
    cursor: auto;
    padding: 20px 0;
    width: 132px;

    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #e1e1e1;
      cursor: pointer;
      padding-bottom: 3px;
      width: 83px;
    }
    & > div:nth-of-type(1) {
      margin-bottom: 13.5px;
      color: ${({ engTranslated }) => (engTranslated ? '#9d9d9d' : '#464646')};
      font-weight: ${({ engTranslated }) => (engTranslated ? 400 : 700)};
    }
    & > div:nth-of-type(2) {
      color: ${({ engTranslated }) => (engTranslated ? '#464646' : '#9d9d9d')};
      font-weight: ${({ engTranslated }) => (engTranslated ? 700 : 400)};
    }
    @media (max-width: 768px) {
      top: 30px;
    }
  `,
};
