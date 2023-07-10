import { FC } from 'react';

import Panorama from '../components/Panorama';
import Minimap from '../components/Minimap';
import Result from '../components/Result';
import Info from '../components/Info';
import Sidebar from '../components/Sidebar';
import Warning from '../components/Warning';

//@ts-ignore

export const Singleplayer: FC = () => {
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
