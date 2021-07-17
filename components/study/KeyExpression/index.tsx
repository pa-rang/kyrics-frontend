import styled from '@emotion/styled';
import { defaultSWROptions } from 'hooks/api';
import { client, KyricsSWRResponse } from 'lib/api';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import { IMyVocab } from 'types';

import KeyExpressionItem from './KeyExpressionItem';
import LookingMore from './LookingMore';

function KeyExpression() {
  const router = useRouter();
  const {
    query: { id: songId },
  } = router;

  const { data: keyExpressionsData } = useSWR<KyricsSWRResponse<IMyVocab[]>>(
    `/song/${songId}/vocab`,
    client.get,
    defaultSWROptions,
  );
  const keyExpressions = keyExpressionsData?.data.data;

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
            style={{ marginBottom: '12px' }}
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
  Root: styled.div`
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

  KeyExpressionWrapper: styled.div``,
};
