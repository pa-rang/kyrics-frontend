import styled from '@emotion/styled';
import { useGetUser, useGetVocabData } from 'hooks/api';
import { useRouter } from 'next/router';
import React from 'react';

import KeyExpressionItem from './KeyExpressionItem';
import LookingMore from './LookingMore';

function KeyExpression() {
  const router = useRouter();
  const songId = Number(router.query.id);
  const user = useGetUser();
  const keyExpressions = useGetVocabData(songId, user);

  return (
    <Styled.Root>
      <Styled.Title>Key Expression</Styled.Title>
      <LookingMore />
      <Styled.KeyExpressionWrapper>
        {keyExpressions?.map(({ id, eng, engExample, kor, korExample, isSaved }) => (
          <KeyExpressionItem
            key={kor}
            type="line-left"
            width="100%"
            eng={eng}
            engExample={engExample}
            kor={kor}
            korExample={korExample}
            styled={{ marginBottom: '12px' }}
            isSaved={isSaved}
            id={id}
            songId={Number(songId)}
          />
        ))}
      </Styled.KeyExpressionWrapper>
    </Styled.Root>
  );
}

export default KeyExpression;

const Styled = {
  Root: styled.section`
    margin-left: 36px;
    width: 343px;
    height: 100%;
  `,
  Title: styled.h3`
    margin-top: 36px;
    margin-bottom: 23px;
    color: #7d7d7d;
    font-size: 24px;
    font-weight: 700;
    @media (max-width: 768px) {
      display: none;
    }
  `,

  KeyExpressionWrapper: styled.section``,
};
