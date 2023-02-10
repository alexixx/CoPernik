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

  const score = useSelector((state: RootState) => state.player.score);
  const level = useSelector((state: RootState) => state.player.level);

  return (
    <>
      {
        <div className="modal modal--info">
          <div className="lvl">{level} lvl</div>
          <div className="mode">Moscow</div>
          <div className="score">{score} points</div>
        </div>
      }
    </>
  );
};

export default Result;
