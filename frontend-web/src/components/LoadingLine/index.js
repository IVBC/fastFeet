import React, { memo } from 'react';
import Shimmer from 'react-shimmer-effect';

import { Loading } from './styles';

function LoadingLine() {
  return (
    <Shimmer>
      <Loading />
    </Shimmer>
  );
}

export default memo(LoadingLine);
