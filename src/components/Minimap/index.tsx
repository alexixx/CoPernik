import React, { useEffect, useState } from 'react';
import { Map, YMaps, Polyline } from 'react-yandex-maps';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';

type DataPolyline = number[][];

const Minimap = () => {
  const [selectedPoints, setSelectedPoints] = useState<any>([0, 0]);
  const [finalPoints, setFinalPoints] = useState<any>();
  const [zoom, setZoom] = useState(1);
  const [popupStatus, setPopupStatus] = useState(false);
  const [polyLine, setPolyLine] = useState<DataPolyline>([
    [0, 0],
    [0, 0],
  ]);

  const currentPoints = useSelector((state: RootState) => state.points.currentCoords);

  const clickOnMiniMap = (e: any) => {
    console.log(e);

    setSelectedPoints(e.get('coords'));
    setPopupStatus(true);
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
            onClick={(e: Event) => clickOnMiniMap(e)}>
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
  );
};

export default Minimap;
