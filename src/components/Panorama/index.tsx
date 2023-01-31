import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Panorama, YMaps } from 'react-yandex-maps';
import axios from 'axios';
import { RootState } from '../../redux/store';

import { setCurrentPoints } from '../../redux/slices/pointsSlice';
import { setNextLevel } from '../../redux/slices/playerSlice';
import { fetchCities } from '../../redux/slices/citiesSlice';

const BigPanorama = () => {
  const dispatch = useDispatch();

  const citiesCoords = useSelector((state: RootState) => state.cities.citiesCoords);
  const status = useSelector((state: RootState) => state.cities.status);

  const currentPoints = useSelector((state: RootState) => state.points.currentCoords);
  const currentLvl = useSelector((state: RootState) => state.player.level);

  //Set next lvl
  useEffect(() => {
    console.log('Переход на первый уровень');

    dispatch(setNextLevel());
  }, []);

  useEffect(() => {
    console.log('Произошло обновление уровня');
    console.log('currentLvl: ', currentLvl);
    if (currentLvl) {
      getCity();
    }
  }, [currentLvl]);

  // After receiving the polygons, send them to the array
  useEffect(() => {
    console.log(citiesCoords);

    if (status == 'success') {
      console.log('Запрос выполнен выполняется вызов функции setPoints');

      setPoints();
    }
  }, [citiesCoords]);

  const getCity = async () => {
    // Get all cities for game

    console.log('Выполняется getCity');

    try {
      // @ts-ignore
      dispatch(fetchCities());
    } catch (error) {
      console.log('error');
    }
  };

  const setPoints = () => {
    // Set coordinates of the selected panorama
    console.log('Выполняется setPoints');

    console.log('🚀 ~ file: index.tsx:65 ~ setPoints ~ citiesCoords', citiesCoords);
    if (citiesCoords) {
      // let indexCity = getRandomNumbers(0, 1, 0);
      let indexCity = 0;
      dispatch(
        setCurrentPoints([
          getRandomNumbers(
            Number(citiesCoords[indexCity][0]),
            Number(citiesCoords[indexCity][1]),
            6,
          ),
          getRandomNumbers(
            Number(citiesCoords[indexCity][2]),
            Number(citiesCoords[indexCity][3]),
            6,
          ),
        ]),
      );
    }

    // dispatch(setCurrentPoints([getRandomNumbers(55.7, 55.8), getRandomNumbers(37.5, 37.6)]));
    // dispatch(setCurrentPoints([getRandomNumbers(40.7, 60.8), getRandomNumbers(27.5, 47.6)]));
  };

  const getRandomNumbers = (min: number, max: number, float: number) => {
    // Get random coords for panorama
    return Number((Math.random() * (max - min) + min).toFixed(float));
  };

  const loadPanorama = (e: any) => {
    console.log('PANORAMA ONLOAD!!', e.ready()._status);
  };

  if (!currentPoints) {
    console.log('Координаты для инициализации панорамы еще не получены');

    return <div className="loading">LOADING</div>;
  } else {
    // console.log('currentPoints ', currentPoints);

    console.log('Производится рендер компонента панорамы');

    return (
      <>
        <div className="test">{currentPoints}</div>
      </>
      // <YMaps
      //   key="panorama"
      //   query={{ lang: 'en_RU', apikey: 'c2b47d53-207f-4593-9c59-b6e18207f6c2' }}>
      //   <div className="panorama-main">
      //     <Panorama
      //       point={currentPoints}
      //       options={{ controls: [''] }}
      //       width={'100%'}
      //       height={'100%'}
      //       onLoad={(e) => {}}
      //     />
      //   </div>
      // </YMaps>
    );
  }
};

export default BigPanorama;
