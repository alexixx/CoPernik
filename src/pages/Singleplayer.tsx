import axios from 'axios';
import { useState, useEffect, useRef, useCallback, FC } from 'react';

import Skeleton from '../components/Skeleton';
import Panorama from '../components/BigPanorama';
import ymaps from 'ymaps';
import { YMaps, Map, Polyline } from 'react-yandex-maps';

//@ts-ignore

type DataPolyline = number[][];

const getRandomNumbers = (min: number, max: number) => {
  return Number((Math.random() * (max - min) + min).toFixed(6));
};

export const Singleplayer: FC = () => {
  //key: 'c2b47d53-207f-4593-9c59-b6e18207f6c2'

  const [popupStatus, setPopupStatus] = useState(false);
  const [currentPoints, setCurrentPoints] = useState<any>([0, 0]);
  const [selectedPoints, setSelectedPoints] = useState<any>([0, 0]);
  const [finalPoints, setFinalPoints] = useState<any>();
  const [zoom, setZoom] = useState(1);
  const [polyLine, setPolyLine] = useState<DataPolyline>([
    [0, 0],
    [0, 0],
  ]);

  useEffect(() => {
    setPoints();
  }, []);

  const clickOnMiniMap = (e: any) => {
    console.log(e);

    setSelectedPoints(e.get('coords'));
    // setPopupStatus(true);
  };

  const setPoints = () => {
    setCurrentPoints([getRandomNumbers(55.7, 55.8), getRandomNumbers(37.5, 37.6)]);
  };

  const clickPopupYes = () => {
    let pointsDifference = 0;

    setFinalPoints([
      (currentPoints[0] + selectedPoints[0]) / 2,
      (currentPoints[1] + selectedPoints[1]) / 2,
    ]);

    const calcDifference = () => {
      let x: number = Math.abs(currentPoints[0]) - Math.abs(selectedPoints[0]);
      let y: number = Math.abs(currentPoints[1]) - Math.abs(selectedPoints[1]);
      return Math.abs(Math.abs(x) - Math.abs(y));
    };

    pointsDifference = calcDifference();

    if (pointsDifference > 20) {
      setZoom(2);
    } else if (calcDifference() < 1.4) {
      setZoom(8);
    } else {
      setZoom(4);
    }

    setPolyLine([currentPoints, selectedPoints]);

    setPopupStatus(false);
  };
  const clickPopupNo = () => {
    console.log('no');

    setPopupStatus(false);
  };
  return (
    <>
      <Panorama />

      <div className="map map--mini">
        <YMaps key="mini-map">
          <div>
            <Map
              state={
                finalPoints
                  ? { center: finalPoints, zoom: zoom }
                  : { center: [55.75, 37.57], zoom: 1 }
              }
              width={350}
              height={220}
              onClick={clickOnMiniMap}>
              <Polyline
                geometry={polyLine}
                options={{
                  balloonCloseButton: false,
                  strokeColor: '#ffe600',
                  strokeWidth: 4,
                  strokeOpacity: 0,
                }}
              />
            </Map>
          </div>
        </YMaps>

        {popupStatus ? (
          <div className="popup popup--mini">
            <div className="popup__question">Отметить эту точку?</div>
            <div className="popup__btn-wrapper">
              <button onClick={() => clickPopupYes()}>Да</button>
              <button onClick={() => clickPopupNo()}>Нет</button>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default Singleplayer;
