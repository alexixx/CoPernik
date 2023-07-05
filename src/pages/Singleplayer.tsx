import axios from 'axios';
import { useState, useEffect, useRef, useCallback, FC } from 'react';

import Skeleton from '../components/Skeleton';
import Panorama from '../components/Panorama';
import Minimap from '../components/Minimap';
import Result from '../components/Result';
import Info from '../components/Info';
import Sidebar from '../components/Sidebar';
import Welcome from '../components/Welcome';
import Warning from '../components/Warning';
import { RootState } from '../redux/store';
// import ymaps from 'ymaps';

import { useSelector, useDispatch } from 'react-redux';

//@ts-ignore

export const Singleplayer: FC = () => {
  //key: 'c2b47d53-207f-4593-9c59-b6e18207f6c2'
  //   window.onbeforeunload = function () {
  //     window.location.assign('/');
  //     //  window.location.href = '/';
  //     console.log('REDIRECT');

  //     return 'Dude, are you sure you want to leave? Think of the kittens!';
  //   };

  return (
    <>
      <Panorama />
      <Minimap />
      <Info />
      <Sidebar />
      <Result />
      <Warning />
    </>
  );
};

export default Singleplayer;
