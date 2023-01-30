import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Panorama, YMaps } from 'react-yandex-maps';
import { RootState } from '../../redux/store';

import { addPoints, setNextLevel } from '../../redux/slices/playerSlice';
import {
  setCurrentPoints,
  setFinalPoints,
  setSelectedPoints,
} from '../../redux/slices/pointsSlice';

const Result = () => {
  const dispatch = useDispatch();

  const currentPoints = useSelector((state: RootState) => state.points.currentCoords);
  const selectedPoints = useSelector((state: RootState) => state.points.selectedCoords);
  const finalPoints = useSelector((state: RootState) => state.points.finalCoords);

  const score = useSelector((state: RootState) => state.player.score);
  const level = useSelector((state: RootState) => state.player.level);

  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (currentPoints) {
      setDistance(Number(calcDistance().toFixed(2)));
    }
  }, [finalPoints]);
  useEffect(() => {
    if (distance != 0) {
      calcResult();
    }
  }, [distance]);

  const calcDistance = () => {
    // Calc distance between coords
    if (currentPoints) {
      return (
        Math.sqrt(
          (selectedPoints[0] - currentPoints[0]) ** 2 + (selectedPoints[1] - currentPoints[1]) ** 2,
        ) * 100
      );
    } else {
      alert('current points отсутствует при расчитывании дистанции');
      return 0;
    }
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

  const clickNextLevel = () => {
    //Reset coordinates and switch lvl

    dispatch(setNextLevel());

    dispatch(setCurrentPoints(null));
    dispatch(setSelectedPoints([0, 0]));
    dispatch(setFinalPoints(null));
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
            <div className="">Текущий уровень: {level}</div>
          </div>
          <div className="modal-window__progressbar">
            <div className="bar"></div>
            <div className="numbers"></div>
          </div>
          <div className="modal-window__buttons">
            <div className="btn btn--ok" onClick={() => clickNextLevel()}>
              Cледующий уровень
            </div>
            <div className="btn btn--cancel"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Result;
