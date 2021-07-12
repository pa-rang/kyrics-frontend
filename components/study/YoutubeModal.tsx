import styled from '@emotion/styled';
import React from 'react';

interface Props {
  videoId?: string;
  isModalOpened: boolean;
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

function YoutubeModal({ videoId, isModalOpened, setIsModalOpened }: Props) {
  return (
    <YoutubeModalWrapper isModalOpened={isModalOpened}>
      {/* modal 의 currentTime이랑 player의 currentTime이랑 연계되어야 하기 때문에, 이후에 나희가 만든 player component에서 modal을 따로 띄우겠음. 일단 퍼블리싱했음. */}
      <div className="modal">
        <iframe
          // type="text/html"
          title="youtuve video player"
          width="1149px"
          height="647px"
          src="https://www.youtube.com/embed/-5q5mZbe3V8"
          // src=`https://www.youtube.com/embed/${videoId}`
          frameBorder="0"
          allowFullScreen
        ></iframe>
        <img
          className="modalClose--btn"
          src="assets/icons/modalCloseIcon.svg"
          alt=""
          onClick={() => setIsModalOpened(false)}
          aria-hidden="true"
        />
      </div>
    </YoutubeModalWrapper>
  );
}

export default YoutubeModal;

const YoutubeModalWrapper = styled.div<{ isModalOpened: boolean }>`
  display: ${({ isModalOpened }) => (isModalOpened ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  z-index: 11;
  background: rgba(0, 0, 0, 0.8);
  width: 100vw;
  height: 100vh;

  .modal {
    position: fixed;
    top: 90px;
  }
  iframe {
    z-index: 12;
  }
  .modalClose--btn {
    position: absolute;
    top: 15.33px;
    right: -28.33px;
    transform: translateX(100%);
  }
`;
