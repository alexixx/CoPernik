import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Panorama, YMaps } from 'react-yandex-maps';
import axios from 'axios';
import { RootState } from '../../redux/store';

import { setCurrentPoints } from '../../redux/slices/pointsSlice';

type CitiesCoords = string[][];

const citiesNames = ['London', 'Moscow', 'Berlin'];

const BigPanorama = () => {
  const [citiesCoords, setCitiesCoords] = useState<CitiesCoords>();
  const currentPoints = useSelector((state: RootState) => state.points.currentCoords);
  const dispatch = useDispatch();
  useEffect(() => {
    getCity();
  }, []);

  // After receiving the polygons, send them to the array
  useEffect(() => {
    setPoints();
  }, [citiesCoords]);

  const getCity = async () => {
    // Get all cities for game
    let result = [];
    for (let i = 0; i < citiesNames.length; i++) {
      const { data } = await axios.get('http://nominatim.openstreetmap.org/search', {
        params: {
          q: citiesNames[i],
          format: 'json',
          polygon_geojson: 1,
        },
      });

      if (data) {
        result.push(data[0].boundingbox);
      }
    }

    if (result) {
      setCitiesCoords(result);
    }

    //@ts-ignore
  };

  const setPoints = () => {
    // Set coordinates of the selected panorama
    console.log(citiesCoords);

    if (citiesCoords) {
      let indexCity = getRandomNumbers(0, 3, 0);
      dispatch(
        setCurrentPoints([
          getRandomNumbers(
            Number(citiesCoords[indexCity][0]),
            Number(citiesCoords[indexCity][1]),
            2,
          ),
          getRandomNumbers(
            Number(citiesCoords[indexCity][2]),
            Number(citiesCoords[indexCity][3]),
            2,
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

  return (
    <>
      <div className="test">{currentPoints}</div>
    </>
    // <YMaps key="panorama" query={{ lang: 'en_RU', apikey: 'c2b47d53-207f-4593-9c59-b6e18207f6c2' }}>
    //   <div className="panorama-main">
    //     <Panorama
    //       point={currentPoints}
    //       options={{ controls: [''] }}
    //       width={'100%'}
    //       height={'100%'}
    //     />
    //   </div>
    // </YMaps>
  );
};

export default BigPanorama;
