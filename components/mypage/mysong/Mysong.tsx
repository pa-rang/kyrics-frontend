import { client } from 'lib/api';
import React from 'react';
import useSWR from 'swr';
import { IMySongItem } from 'types';

import MySongItem from './MySongItem';
function Mysong() {
  const { data } = useSWR<{ data: IMySongItem[] }>('/user/song', client.get);

  console.log(data);

  return (
    <div>
      {data?.data[0] &&
        data?.data.map((data: IMySongItem, index: React.Key) => (
          <MySongItem mySongData={data} key={index} />
        ))}
    </div>
  );
}

export default Mysong;
