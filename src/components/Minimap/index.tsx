import React, { useEffect, useState } from 'react';
import { Map, YMaps, Polyline } from 'react-yandex-maps';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setSelectedPoints, setFinalPoints } from '../../redux/slices/pointsSlice';
import { setPolyline } from '../../redux/slices/playerSlice';

type DataPolyline = number[][] | null;
type localSelectedPoints = number[];

const Minimap = () => {
  const dispatch = useDispatch();
  // const [selectedPoints, setSelectedPoints] = useState<any>([0, 0]);
  // const [finalPoints, setFinalPoints] = useState<any>();
  const [zoom, setZoom] = useState(1);
  const [popupStatus, setPopupStatus] = useState(false);
  // const [polyLine, setPolyLine] = useState<DataPolyline>(null);
  const [localSelectedPoints, setLocalSelectedPoints] = useState<localSelectedPoints>();
  const [minimapSize, setMinimapSize] = useState([350, 220]);

  const polyline = useSelector((state: RootState) => state.player.polyline);
  const currentPoints = useSelector((state: RootState) => state.points.currentCoords);
  const selectedPoints = useSelector((state: RootState) => state.points.selectedCoords);
  const finalPoints = useSelector((state: RootState) => state.points.finalCoords);

  const [loaderMnimap, setLoaderMinimap] = useState(false);

  useEffect(() => {
    // Resetting the zoom and coords for polygon when starting a new level
    console.log('СБРОС КООРДИНАТ ДЛЯ POLYLINE');

    dispatch(setPolyline(null));
    setZoom(1);
    setLoaderMinimap(true);
    setTimeout(() => {
      let panoramaDOM = document.querySelectorAll('.panorama-main *');
      if (panoramaDOM.length > 1) {
        setLoaderMinimap(false);
      }
    }, 1500);
  }, [currentPoints]);

  const clickOnMiniMap = (e: any) => {
    // fixing the selected coordinates

    if (!selectedPoints) {
      setLocalSelectedPoints(e.get('coords'));
      setPopupStatus(true);
    }
  };
  const onHoverMap = () => {
    console.log('HOVER MINIMAP');
    if (!loaderMnimap) setMinimapSize([750, 420]);
  };
  const onLeaveleave = () => {
    setMinimapSize([350, 220]);
  };
  const clickPopupYes = () => {
    let pointsDifference = 0;

    if (currentPoints && localSelectedPoints) {
      // Calc final points for zoom (between selected and current points)

      console.log('localSelectedPoints:', localSelectedPoints);
      dispatch(setSelectedPoints(localSelectedPoints));
      console.log('selctedPoints:', selectedPoints);

      dispatch(
        setFinalPoints([
          (currentPoints[0] + localSelectedPoints[0]) / 2,
          (currentPoints[1] + localSelectedPoints[1]) / 2,
        ]),
      );

      const calcDifference = () => {
        //Calc difference between selected and current coords
        let x: number = Math.abs(currentPoints[0]) - Math.abs(localSelectedPoints[0]);
        let y: number = Math.abs(currentPoints[1]) - Math.abs(localSelectedPoints[1]);
        return Math.abs(Math.abs(x) - Math.abs(y));
      };

      pointsDifference = calcDifference();

      //Changing the zoom depending on the distance to the desired point
      if (pointsDifference > 20) {
        setZoom(2);
      } else if (calcDifference() < 1.4) {
        setZoom(8);
      } else {
        setZoom(4);
      }

      dispatch(setPolyline([currentPoints, localSelectedPoints]));
    }

    setPopupStatus(false);
  };

  const clickPopupNo = () => {
    setPopupStatus(false);
  };

  const defaultCoordsForZoom = () => {};

  return (
    <div
      className="mini-map__container"
      onMouseEnter={() => onHoverMap()}
      onMouseLeave={() => onLeaveleave()}
      style={{ width: `${minimapSize[0]}px`, height: `${minimapSize[1]}px` }}>
      <div className="mini-map" style={{ width: `100%`, height: `100%` }}>
        {/* <div className="placeholder-map"> </div> */}
        <YMaps key="mini-map">
          <Map
            state={
              finalPoints
                ? { center: finalPoints, zoom: zoom, behaviors: [] }
                : { center: currentPoints ? currentPoints : [55.75, 37.57], zoom: 9 }
            }
            options={{ autoFitToViewport: 'always', controls: [''] }}
            width={'100%'}
            height={'100%'}
            onClick={(e: Event) => clickOnMiniMap(e)}>
            {finalPoints && polyline && (
              <Polyline
                geometry={polyline}
                options={{
                  balloonCloseButton: false,
                  strokeColor: '#ffe600',
                  strokeWidth: 4,
                  strokeOpacity: 0,
                }}
              />
            )}
          </Map>
        </YMaps>

        {popupStatus ? (
          <div className="modal modal--mini-map">
            <div className="modal__subtitle">Сhoose this point?</div>
            <div className="btn-wrapper">
              <button onClick={() => clickPopupYes()}>Yes</button>
              <button onClick={() => clickPopupNo()}>Hmm...</button>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>

      {loaderMnimap ? (
        <>
          {' '}
          <div className="loader loader--minimap">
            <svg
              className="ip"
              viewBox="0 0 256 128"
              width="256px"
              height="128px"
              xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#fff" />
                  <stop offset="33%" stop-color="#9eecd9" />
                  <stop offset="67%" stop-color="#9eecd9" />
                  <stop offset="100%" stop-color="#2fb8ff" />
                </linearGradient>
                <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%" stop-color="#2fb8ff" />
                  <stop offset="33%" stop-color="#9eecd9" />
                  <stop offset="67%" stop-color="#9eecd9" />
                  <stop offset="100%" stop-color="#fff" />
                </linearGradient>
              </defs>
              <g fill="none" stroke-linecap="round" stroke-width="16">
                <g className="ip__track" stroke="#ddd">
                  <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                  <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                </g>
                <g stroke-dasharray="180 656">
                  <path
                    className="ip__worm1"
                    stroke="url(#grad1)"
                    stroke-dashoffset="0"
                    d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"
                  />
                  <path
                    className="ip__worm2"
                    stroke="url(#grad2)"
                    stroke-dashoffset="358"
                    d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div className="glass glass--minimap"></div>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default Minimap;
