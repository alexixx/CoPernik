import axios from 'axios';
import { useState, useEffect, useRef, useCallback, FC } from 'react';
import Menu from '../components/Menu';
import Skeleton from '../components/Skeleton';

type PackageItem = {
  name: string;
  homepage?: string;
}[];

export const Home: FC = () => {
  return (
    <>
      <div className="home">
        <div className="home__column">
          <div className="title">COPERNIK</div>
        </div>
        <div className="home__column">
          <Menu />
        </div>
        <div className="home__column">
          <img src="img/COPERNIK.png" alt="Kopernik" className="kopernik-img" />
        </div>
      </div>
      <div className="copyright">
        <a href="https://github.com/alexixx" target="_blank">
          by Alexixx
        </a>
      </div>
    </>
  );
};

export default Home;
