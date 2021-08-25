import styled from '@emotion/styled';
import { usePhone } from 'hooks/useMobile';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useRef } from 'react';

interface Props {
  isProfileClicked: boolean;
  setIsProfileClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProfileMenu({ isProfileClicked, setIsProfileClicked }: Props): ReactElement {
  const router = useRouter();
  const isMobile = usePhone() ? 'Mobile' : '';
  const modalEl = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: any) => {
    if (isProfileClicked && !modalEl?.current?.contains(e.target)) {
      setIsProfileClicked(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <Wrap ref={modalEl}>
      <div className="option" onClick={() => router.push('/mypage/settings')}>
        <img className="option__icon" src={`/assets/icons/Ic${isMobile}Setting.svg`} alt=""></img>
        <p className="option__label">Account Settings</p>
        <div className="option__border"></div>
      </div>
      <div
        className="option"
        onClick={() =>
          router.push({
            pathname: '/mypage/collection',
            query: { type: 'mysongs' },
          })
        }
      >
        <img className="option__icon" src={`/assets/icons/Ic${isMobile}MySong.svg`} alt=""></img>
        <p className="option__label">My Songs</p>
        <div className="option__border"></div>
      </div>
      <div
        className="option"
        onClick={() =>
          router.push({
            pathname: '/mypage/collection',
            query: { type: 'myvocab' },
          })
        }
      >
        <img className="option__icon" src={`/assets/icons/Ic${isMobile}MyVoca.svg`} alt=""></img>
        <p className="option__label">My Vocab</p>
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
  /* box-sizing: border-box; */
  display: flex;
  position: absolute;
  top: 76px;
  right: 55px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  border-radius: 16px;
  box-shadow: 3px 3px 7px 4px rgba(98, 98, 98, 0.12);
  background: #f8fafc;
  width: 238px;
  height: 128px;

  .option {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    border: none;
    background: transparent;
    cursor: pointer;
    width: 204px;
    height: 30px;

    &:hover {
      filter: brightness(0) saturate(100%) invert(33%) sepia(48%) saturate(2268%) hue-rotate(222deg)
        brightness(105%) contrast(91%);
    }

    &__icon {
      transform: translateY(-1px);
      margin-left: 10px;
      width: 19px;
      height: 19px;
    }

    &__label {
      margin-left: 12px;
      color: #9d9d9d;
      font-size: 16px;
      font-weight: 500;
      font-style: normal;
    }

    &__border {
      opacity: 0.53;
      margin-top: 7px;
      background: #e1e1e1;
      width: 204px;
      height: 1px;
    }
  }

  @media (max-width: 415px) {
    top: 42px;
    right: 20px;
    width: 162px;
    height: 114px;
    .option {
      margin-top: 12px;
      width: 140px;
      height: 20px;
      &__icon {
        transform: translateY(1px);
        margin: 0;
        width: 13px;
        height: 13px;
      }

      &__label {
        margin-left: 8px;
        font-size: 13px;
      }

      &__border {
        width: 138px;
      }
    }

    .option:nth-of-type(1) {
      margin-top: 2px;
    }
  }
`;

export default ProfileMenu;
