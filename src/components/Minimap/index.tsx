import React, { useEffect, useState } from 'react';
import { Map, YMaps, Polyline } from 'react-yandex-maps';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setSelectedPoints, setFinalPoints } from '../../redux/slices/pointsSlice';

type DataPolyline = number[][] | null;
type localSelectedPoints = number[];

const Minimap = () => {
  const dispatch = useDispatch();
  // const [selectedPoints, setSelectedPoints] = useState<any>([0, 0]);
  // const [finalPoints, setFinalPoints] = useState<any>();
  const [zoom, setZoom] = useState(1);
  const [popupStatus, setPopupStatus] = useState(false);
  const [polyLine, setPolyLine] = useState<DataPolyline>(null);
  const [localSelectedPoints, setLocalSelectedPoints] = useState<localSelectedPoints>();

  const currentPoints = useSelector((state: RootState) => state.points.currentCoords);
  const selectedPoints = useSelector((state: RootState) => state.points.selectedCoords);
  const finalPoints = useSelector((state: RootState) => state.points.finalCoords);

  useEffect(() => {
    // Resetting the zoom and coords for polygon when starting a new level
    setPolyLine(null);
    setZoom(1);
  }, [currentPoints]);

  const clickOnMiniMap = (e: any) => {
    // fixing the selected coordinates

    setLocalSelectedPoints(e.get('coords'));
    setPopupStatus(true);
  };
  const clickPopupYes = () => {
    let pointsDifference = 0;

    if (currentPoints && localSelectedPoints) {
      // Calc final points for zoom (between selected and current points)

      dispatch(setSelectedPoints(localSelectedPoints));

      dispatch(
        setFinalPoints([
          (currentPoints[0] + selectedPoints[0]) / 2,
          (currentPoints[1] + selectedPoints[1]) / 2,
        ]),
      );

      const calcDifference = () => {
        //Calc difference between selected and current coords
        let x: number = Math.abs(currentPoints[0]) - Math.abs(selectedPoints[0]);
        let y: number = Math.abs(currentPoints[1]) - Math.abs(selectedPoints[1]);
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

      setPolyLine([currentPoints, selectedPoints]);
    }

    setPopupStatus(false);
  };

  const clickPopupNo = () => {
    setPopupStatus(false);
  };

  return (
    <div className="mini-map">
      <YMaps key="mini-map">
        <div>
          <Map
            state={
              finalPoints
                ? { center: finalPoints, zoom: zoom, behaviors: [] }
                : { center: [55.75, 37.57], zoom: 1 }
            }
            width={350}
            height={220}
            onClick={(e: Event) => clickOnMiniMap(e)}>
            {finalPoints && polyLine && (
              <Polyline
                geometry={polyLine}
                options={{
                  balloonCloseButton: false,
                  strokeColor: '#ffe600',
                  strokeWidth: 4,
                  strokeOpacity: 0,
                }}
              />
            )}
          </Map>
        </div>
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
