import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCities } from '../../redux/slices/citiesSlice';
import { setDifficult } from '../../redux/slices/playerSlice';
type City = string;
type Difficult = string;

const Welcome: FC = () => {
  const dispatch = useDispatch();

  const [city, setCityCurrent] = useState<City>();
  const [difficult, setDifficultCurrent] = useState<Difficult>();

  const onClickSetDifficult = (diff: string) => {
    setDifficultCurrent(diff);
    dispatch(setDifficult(diff));
  };
  const onClickSetCity = (city: string) => {
    setCityCurrent(city);
    dispatch(setCities(city));
  };

  return (
    <div className="welcome-page__img">
      <div className="glass glass--welcome">
        <div className="welcome-page modal">
          <div className="welcome-page__title">Hi, friend! 👋</div>
          <div className="welcome-page__subtitle">A little about the game</div>
          <p>
            There are only 5 levels in the game. At each of the levels you will be shown a panorama
            of a place. At the bottom right there is a minimap on which you will need to mark the
            place where you are.
          </p>
          <p>
            Try to specify your location as much as possible. If you can score 100 or more points,
            then you know this city very well.
          </p>
          <p>At a lower difficulty level, you will get more points.</p>
          <p className="">Have fun!</p>
          <div className="welcome-page__subtitle">Customize your game</div>
          <div className="settings">
            <div className="settings__column settings__column--city">
              <div className="settings__title">Choose a city</div>
              <div className="settings__list">
                <button
                  className={city == 'Moscow' ? 'settings__item active' : 'settings__item'}
                  onClick={() => onClickSetCity('Moscow')}>
                  Msocow
                </button>
                {/* <button
                  className={city == 'Vladimir' ? 'settings__item active' : 'settings__item'}
                  onClick={() => onClickSetCity('Vladimir')}>
                  Vladimir
                </button> */}
                <button
                  className={
                    city == 'Saint-Petersburg' ? 'settings__item active' : 'settings__item'
                  }
                  onClick={() => onClickSetCity('Saint-Petersburg')}>
                  Saint-Petersburg
                </button>
                <button
                  className={
                    city == 'Nizhniy Novgorod' ? 'settings__item active' : 'settings__item'
                  }
                  onClick={() => onClickSetCity('Nizhniy Novgorod')}>
                  Nizhniy Novgorod
                </button>
              </div>
            </div>
            <div className="settings__column settings__column--difficult">
              <div className="settings__title">Choose the difficulty level</div>
              <div className="settings__list">
                <button
                  className={difficult == 'easy' ? 'settings__item active' : 'settings__item'}
                  onClick={() => onClickSetDifficult('easy')}>
                  Easy
                </button>
                <button
                  className={difficult == 'normal' ? 'settings__item active' : 'settings__item'}
                  onClick={() => onClickSetDifficult('normal')}>
                  Normal
                </button>
                <button
                  className={difficult == 'hard' ? 'settings__item active' : 'settings__item'}
                  onClick={() => onClickSetDifficult('hard')}>
                  Hard
                </button>
              </div>
            </div>
          </div>
          {city && difficult ? (
            <div className="btn-wrapper">
              <Link to="/">
                <button>Exit</button>
              </Link>
              <Link to="/singleplayer" className="start-btn">
                <button>Start game</button>
              </Link>
            </div>
          ) : (
            <>
              <p className="attention">Choose a difficulty level and a city to start</p>
              <div className="btn-wrapper">
                <Link to="/">
                  <button>Exit</button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
