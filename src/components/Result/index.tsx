import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Panorama, YMaps } from 'react-yandex-maps';
import { RootState } from '../../redux/store';

import { addPoints } from '../../redux/slices/playerSlice';

const Result = () => {
  const dispatch = useDispatch();

  const currentPoints = useSelector((state: RootState) => state.points.currentCoords);
  const selectedPoints = useSelector((state: RootState) => state.points.selectedCoords);
  const finalPoints = useSelector((state: RootState) => state.points.finalCoords);

  const score = useSelector((state: RootState) => state.player.score);

  const [distance, setDistance] = useState(0);

  useEffect(() => {
    setDistance(Number(calcDistance().toFixed(2)));
  }, [finalPoints]);
  useEffect(() => {
    if (distance != 0) {
      calcResult();
    }
  }, [distance]);

  const calcDistance = () => {
    // Calc distance between coords
    return (
      Math.sqrt(
        (selectedPoints[0] - currentPoints[0]) ** 2 + (selectedPoints[1] - currentPoints[1]) ** 2,
      ) * 100
    );
  };

  const calcResult = () => {
    if (distance < 30) {
      dispatch(addPoints(100));
      //   setResult(100);
    } else if (distance > 200) {
      dispatch(addPoints(5));
      //   setResult(5);
    } else {
      dispatch(addPoints(20));
      // setResult(20);
    }
  };
  return (
    <>
      {finalPoints && (
        <div className="modal-window">
          <div className="modal-window__title"></div>
          <div className="modal-window__subtitle"></div>
          <div className="modal-window__description">
            <div className="">Расстояние до точки {distance} км</div>
            <div className="">Общий счет игры {score}</div>
          </div>
          <div className="modal-window__progressbar">
            <div className="bar"></div>
            <div className="numbers"></div>
          </div>
          <div className="modal-window__buttons">
            <div className="btn btn--ok"></div>
            <div className="btn btn--cancel"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Result;
