import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Panorama, YMaps } from 'react-yandex-maps';
import axios from 'axios';
import { RootState } from '../../redux/store';
import Loader from '../Loader';

import { setCurrentPoints } from '../../redux/slices/pointsSlice';
import { setNextLevel } from '../../redux/slices/playerSlice';
import { fetchCities } from '../../redux/slices/citiesSlice';

const BigPanorama = () => {
  const dispatch = useDispatch();

  const citiesCoords = useSelector((state: RootState) => state.cities.citiesCoords);
  const status = useSelector((state: RootState) => state.cities.status);

  const currentPoints = useSelector((state: RootState) => state.points.currentCoords);
  const currentLvl = useSelector((state: RootState) => state.player.level);

  const [loaderPanorama, setLoaderPanorama] = useState(true);

  //   useEffect(() => {
  //     first

  //   }, [currentPoints])

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

  const onDirectionChange = () => {
    console.log('Изменились координаты панорамы');
  };
  const onPanoramaError = (e: any) => {
    console.log(e);
    console.log('!!!Error was found');
  };
  const onPanoramaChange = () => {
    console.log('!!Coords of panorama is changed');

    setTimeout(() => {
      let panoramaDOM = document.querySelectorAll('.panorama-main *');
      if (panoramaDOM.length <= 1) {
        // dispatch(setCurrentPoints([55.658412, 37.788544]));
        setPoints();
      }
      console.log(panoramaDOM);
    }, 2000);
  };
  const onPanoramaLoad = (e: any) => {
    // if (!e.panorama.isSupported()) {
    //   console.log('Not supported!');
    //   return;
    // } else {
    //   console.log('Supported!');
    // }
    // console.log('!!!Panorama is loaded');
    // setTimeout(() => {
    //   let panoramaDOM = document.querySelectorAll('.panorama-main *');
    //   if (panoramaDOM.length <= 1) {
    //     setPoints();
    //   }
    //   console.log(panoramaDOM);
    // }, 2000);
  };

  if (!currentPoints) {
    console.log('Координаты для инициализации панорамы еще не получены');

    return <Loader name="main" />;
  } else {
    // console.log('currentPoints ', currentPoints);

    console.log('Производится рендер компонента панорамы');

    return (
      // <>
      //   <div className="test">{currentPoints}</div>
      // </>
      <>
        <YMaps
          key={`panorama-${currentPoints}`}
          query={{
            lang: 'en_RU',
            apikey: 'c2b47d53-207f-4593-9c59-b6e18207f6c2',
            load: 'package.full',
          }}>
          <div className="panorama-main">
            <Panorama
              point={currentPoints}
              options={{ controls: [''] }}
              width={'100%'}
              height={'100%'}
              onLoad={(e) => onPanoramaLoad(e)}
              onPanoramaChange={onPanoramaChange()}
              // onDirectionChange={() => onDirectionChange()}
            />
          </div>
        </YMaps>
        <Loader name="main" />
      </>
    );
  }
};

export default BigPanorama;
