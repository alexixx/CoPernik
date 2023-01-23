import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Panorama, YMaps } from 'react-yandex-maps';
import { RootState } from '../../redux/store';

import { setCurrentPoints } from '../../redux/slices/pointsSlice';

const BigPanorama = () => {
  const currentPoints = useSelector((state: RootState) => state.points.currentCoords);
  const dispatch = useDispatch();
  useEffect(() => {
    setPoints();
  }, []);
  const setPoints = () => {
    dispatch(setCurrentPoints([getRandomNumbers(55.7, 55.8), getRandomNumbers(37.5, 37.6)]));
  };

  const getRandomNumbers = (min: number, max: number) => {
    return Number((Math.random() * (max - min) + min).toFixed(6));
  };
  return (
    <YMaps key="panorama" query={{ lang: 'en_RU', apikey: 'c2b47d53-207f-4593-9c59-b6e18207f6c2' }}>
      <div className="panorama-main">
        <Panorama
          point={currentPoints}
          options={{ controls: [''] }}
          width={'100%'}
          height={'100%'}
        />
      </div>
    </YMaps>
  );
};

export default BigPanorama;
