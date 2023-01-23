import axios from 'axios';
import { useState, useEffect, useRef, useCallback, FC } from 'react';

// import Skeleton from '../components/Skeleton';
// import Panorama from '../components/Panorama';
// // import Minimap from '../components/Minimap';
// import Result from '../components/Result';
import { RootState } from '../../redux/store';
import qs from 'qs';
// import ymaps from 'ymaps';

import { useSelector, useDispatch } from 'react-redux';

//@ts-ignore

export const Game: FC = () => {
  const params = qs.parse(window.location.search.replace(/^./gim, ''));

  const finalPoints = useSelector((state: RootState) => state.points.finalCoords);

  return <></>;
};

export default Game;
