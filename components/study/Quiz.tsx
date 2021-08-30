import styled from '@emotion/styled';
import React from 'react';

function Quiz() {
  return (
    <Root className="quiz__container">
      <div className="quiz--msg1">COMING</div>
      <div className="quiz--msg2">SOON</div>
      <div className="quiz--msg3">We&apos;re currently working hard on this page.</div>
    </Root>
  );
}

export default Quiz;

const Root = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 120px;
  padding-bottom: 138px;
  .quiz--msg1 {
    color: #6465f4;
    font-size: 60px;
    font-weight: 700;
    @media (max-width: 768px) {
      font-size: 40px;
    }
  }
  .quiz--msg2 {
    color: #6465f4;
    font-size: 90px;
    font-weight: 600;
    @media (max-width: 768px) {
      font-size: 60px;
    }
  }
  .quiz--msg3 {
    margin-top: 20px;
    color: #9d9d9d;
    font-size: 20px;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`;
