import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Panorama, YMaps } from 'react-yandex-maps';
import { RootState } from '../../redux/store';
import Loader from '../Loader';

import { setCurrentPoints } from '../../redux/slices/pointsSlice';
import { setNextLevel } from '../../redux/slices/playerSlice';
import { fetchCities } from '../../redux/slices/citiesSlice';

const BigPanorama: FC = () => {
  const dispatch = useDispatch();

  const citiesCoords = useSelector((state: RootState) => state.cities.citiesCoords);
  const status = useSelector((state: RootState) => state.cities.status);
  const currentPoints = useSelector((state: RootState) => state.points.currentCoords);
  const currentLvl = useSelector((state: RootState) => state.player.level);

  useEffect(() => {
    // Moving to the next level

    dispatch(setNextLevel());
  }, []);

  useEffect(() => {
    console.log("There's been a level update");
    if (currentLvl) {
      getCity();
    }
  }, [currentLvl]);

  // After receiving the polygons, send them to the array
  useEffect(() => {
    if (status == 'success') {
      console.log('Запрос выполнен выполняется вызов функции setPoints');

      setPoints();
    }
  }, [citiesCoords]);

  const getCity = async () => {
    // Get all cities for game
    console.log('"getCity" is executed');

    try {
      // @ts-ignore
      dispatch(fetchCities());
    } catch (error) {
      console.log('error');
    }
  };

  const setPoints = () => {
    // Set coordinates of the selected panorama
    console.log('"setPoints" is executed');

    if (citiesCoords) {
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
  };

  const getRandomNumbers = (min: number, max: number, float: number) => {
    // Get random coords for panorama
    return Number((Math.random() * (max - min) + min).toFixed(float));
  };

  const onPanoramaChange = () => {
    setTimeout(() => {
      let panoramaDOM = document.querySelectorAll('.panorama-main *');
      if (panoramaDOM.length <= 1) {
        setPoints();
      }
      console.log(panoramaDOM);
    }, 2000);
  };

  if (!currentPoints) {
    return <Loader name="main" />;
  } else {
    console.log('The panorama is rendered');
    return (
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
              options={{ controls: [''], _markers: [''] }}
              width={'100%'}
              height={'100%'}
              onPanoramaChange={onPanoramaChange()}
            />
          </div>
        </YMaps>
        <Loader name="main" />
      </>
    );
  }
};

export default BigPanorama;
