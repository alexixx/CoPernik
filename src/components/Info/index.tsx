import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';

const Result = () => {
  const score = useSelector((state: RootState) => state.player.score);
  const level = useSelector((state: RootState) => state.player.level);
  const city = useSelector((state: RootState) => state.cities.citiesNames[0]);

  return (
    <>
      {
        <div className="modal modal--info">
          <div className="lvl">{level} lvl</div>
          <div className="mode">{city}</div>
          <div className="score">{score} points</div>
        </div>
      }
    </>
  );
};

export default Result;
