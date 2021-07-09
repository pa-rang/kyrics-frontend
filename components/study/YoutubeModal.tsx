import styled from '@emotion/styled';
import React from 'react';

interface Props {
  videoId: string;
  isModalOpened: boolean;
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

function YoutubeModal({ isModalOpened, setIsModalOpened }: Props) {
  return (
    <YoutubeModalWrapper isModalOpened={isModalOpened}>
      {/* modal 의 currentTime이랑 player의 currentTime이랑 연계되어야 하기 때문에, 이후에 나희가 만든 player component에서 modal을 따로 띄우겠음. 일단 퍼블리싱했음. */}
      <div className="modal">
        <iframe
          // type="text/html"
          title="youtuve video player"
          width="1149px"
          height="647px"
          src="https://www.youtube.com/embed/Y1o74zp8ugE"
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
{
  /* <iframe id="ytplayer" type="text/html" width="640" height="360"
  src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
  frameborder="0"></iframe> */
}

const YoutubeModalWrapper = styled.div<{ isModalOpened: boolean }>`
  display: ${({ isModalOpened }) => (isModalOpened ? 'flex' : 'none')};
  position: absolute;
  top: 0;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  width: 100vw;
  height: 100vh;

  .modal {
    position: absolute;
    top: 90px;
  }
  .modalClose--btn {
    position: absolute;
    top: 15.33px;
    right: -28.33px;
    transform: translateX(100%);
  }
`;
