import axios from 'axios';
import { useState, useEffect, useRef, useCallback, FC } from 'react';
import Menu from '../components/Menu';
import Skeleton from '../components/Skeleton';
import { useSelector, useDispatch } from 'react-redux';
import { setNextLevel, resetLevel, resetScore } from '../redux/slices/playerSlice';
import { setCurrentPoints, setSelectedPoints, setFinalPoints } from '../redux/slices/pointsSlice';
import { resetCities, resetCoords } from '../redux/slices/citiesSlice';

type PackageItem = {
  name: string;
  homepage?: string;
}[];

export const Home: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetScore());
    dispatch(resetLevel());

    dispatch(setCurrentPoints(null));
    dispatch(setSelectedPoints(null));
    dispatch(setFinalPoints(null));

    dispatch(resetCities());
    dispatch(resetCoords());
  }, []);
  return (
    <>
      <div className="home">
        <div className="home__column">
          <Menu />
        </div>
        <div className="home__column">
          <img src="img/COPERNIK.png" alt="Kopernik" className="kopernik-img" />
        </div>
        <div className="title-wrapper">
          <div className="title">COPERNIK</div>
        </div>
      </div>
      <div className="copyright copyright--main">
        <a href="https://github.com/alexixx" target="_blank">
          by Alexixx
        </a>
      </div>
    </>
  );
};

export default Home;
