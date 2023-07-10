import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';

import { addPoints, setNextLevel, resetLevel, resetScore } from '../../redux/slices/playerSlice';
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
  const difficult = useSelector((state: RootState) => state.player.difficult);

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
    if (currentPoints && selectedPoints) {
      return (
        Math.sqrt(
          (selectedPoints[0] - currentPoints[0]) ** 2 + (selectedPoints[1] - currentPoints[1]) ** 2,
        ) * 100
      );
    } else {
      return 0;
    }
  };

  const calcResult = () => {
    console.log(distance);
    switch (difficult) {
      case 'easy':
        if (distance < 4) {
          dispatch(addPoints(100));
        } else if (distance > 50) {
          dispatch(addPoints(5));
        } else {
          dispatch(addPoints(20));
        }
        break;
      case 'normal':
        if (distance < 4) {
          dispatch(addPoints(50));
        } else if (distance > 50) {
          dispatch(addPoints(3));
        } else {
          dispatch(addPoints(10));
        }

        break;
      case 'hard':
        if (distance < 4) {
          dispatch(addPoints(30));
        } else if (distance > 50) {
          dispatch(addPoints(3));
        } else {
          dispatch(addPoints(10));
        }
        break;

      default:
        if (distance < 4) {
          dispatch(addPoints(50));
        } else if (distance > 50) {
          dispatch(addPoints(3));
        } else {
          dispatch(addPoints(10));
        }
        break;
    }
  };

  const clickNextLevel = () => {
    //Reset coordinates and switch lvl

    dispatch(setNextLevel());

    dispatch(setCurrentPoints(null));
    dispatch(setSelectedPoints(null));
    dispatch(setFinalPoints(null));
  };
  const clickRestartGame = () => {
    //Reset coordinates and clear lvl

    dispatch(setCurrentPoints(null));
    dispatch(setSelectedPoints(null));
    dispatch(setFinalPoints(null));

    dispatch(resetScore());
    dispatch(resetLevel());
    dispatch(setNextLevel());
  };

  return (
    <>
      {finalPoints && (
        <div className="modal modal--result">
          <div className="modal__title">{level >= 5 ? 'Your final result' : 'Your result'}</div>

          <div className="modal__description">
            <p className="">Distance to the point {distance} km</p>
          </div>
          <div className="score">
            <div className="modal__subtitle">Score {score}</div>
            <div className="progressbar">
              <div className="bar" style={{ width: `${score}%` }}></div>
              <div className="numbers"></div>
            </div>
          </div>
          {level >= 5 ? (
            <>
              <div className="result-text">
                {score > 90 ? (
                  <>
                    {' '}
                    Do you know this city!
                    <br />
                    <span className="emoji">😎</span>
                  </>
                ) : score < 30 ? (
                  <>
                    How do I get to...
                    <br />
                    <span className="emoji">😔</span>
                  </>
                ) : (
                  <>
                    Traveler <br />
                    <span className="emoji">🚶‍♂️</span>
                  </>
                )}
              </div>

              <div className="btn-wrapper">
                <button className="ok" onClick={() => clickRestartGame()}>
                  Restart
                </button>
                <Link to="/">
                  <button className="exit">Exit</button>
                </Link>
              </div>
            </>
          ) : (
            <div className="btn-wrapper">
              <button className="ok" onClick={() => clickNextLevel()}>
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Result;
