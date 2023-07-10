import { FC } from 'react';

import SimpleRow from './SimpleRow';
import Box from './Box';

type SkeletonProps = {
  key: number;
  name: string;
};

const Skeleton: FC<SkeletonProps> = (data) => {
  switch (data.name) {
    case 'simple-row':
      return <SimpleRow key={data.key} />;
      break;
    case 'box':
      return <Box />;
      break;

    default:
      return <SimpleRow key={data.key} />;
      break;
  }
};

export default Skeleton;
