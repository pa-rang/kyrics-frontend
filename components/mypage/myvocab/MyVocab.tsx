import KeyExpressionItem from '@components/study/KeyExpression/KeyExpressionItem';
import styled from '@emotion/styled';
import { mockClient } from 'lib/api';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { IMyVocab } from 'types';

// import MyVocabItem from './MyVocabItem';

function MyVocab() {
  //   const { data } = useSWR<{ data: IMySongItem[] }>('/user/song', client.get);
  const { data } = useSWR<{ data: IMyVocab[] }>('/myvocab', mockClient.get);
  const [keyExpressions, setKeyExpressions] = useState<IMyVocab[]>();

  useEffect(() => {
    console.log(data?.data);
    const keys = data?.data as any;

    setKeyExpressions(keys);
  }, [data]);

  return (
    <Styled.Card>
      {keyExpressions &&
        keyExpressions.map(({ eng, engExample, kor, korExample }) => (
          <KeyExpressionItem
            key={kor}
            type="line-top"
            width="254px"
            eng={eng}
            engExample={engExample}
            kor={kor}
            korExample={korExample}
            style={{}}
            myvocab={true}
          />
        ))}
    </Styled.Card>
  );
}

export default MyVocab;

const Styled = {
  Card: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(234px, 1fr));
    justify-items: center;
    column-gap: 25px;
    margin: 50px;
    width: 100%;
    row-gap: 70px;
  `,
};
