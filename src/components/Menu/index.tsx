import axios from 'axios';
import { useState, useEffect, useRef, useCallback, FC } from 'react';
import { Link } from 'react-router-dom';

type PackageItem = {
  name: string;
  homepage?: string;
}[];

export const Menu: FC = () => {
  return (
    <>
      <div className="menu__list menu--main">
        <Link to="/singleplayer" className="menu__item">
          Singleplayer
        </Link>
        <Link to="/multiplayer" className="menu__item">
          Multiplayer
        </Link>
      </div>
    </>
  );
};

export default Menu;
