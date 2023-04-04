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

  useEffect(() => {
    // Resetting the zoom and coords for polygon when starting a new level
    console.log('СБРОС КООРДИНАТ ДЛЯ POLYLINE');

    dispatch(setPolyline(null));
    setZoom(1);
  }, [currentPoints]);

  const clickOnMiniMap = (e: any) => {
    // fixing the selected coordinates

    setLocalSelectedPoints(e.get('coords'));
    setPopupStatus(true);
  };
  const onHoverMap = () => {
    console.log('HOVER MINIMAP');
    setMinimapSize([750, 420]);
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

  return (
    <div
      className="mini-map"
      style={{ width: `${minimapSize[0]}px`, height: `${minimapSize[1]}px` }}
      onMouseEnter={() => onHoverMap()}
      onMouseLeave={() => onLeaveleave()}>
      {/* <div className="placeholder-map"> </div> */}
      <YMaps key="mini-map">
        <Map
          state={
            finalPoints
              ? { center: finalPoints, zoom: zoom, behaviors: [] }
              : { center: [55.75, 37.57], zoom: 8 }
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
  );
};

export default Minimap;
