import axios from 'axios';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Menu: FC = () => {
  //   return (
  //     <>
  //       <div className="modal modal--main">
  //         <Link to="/singleplayer" className="modal__title modal__title--home">
  //           Singleplayer
  //         </Link>
  //         {/* <Link to="/multiplayer" className="modal__title modal__title--home">
  //           Multiplayer
  //         </Link> */}
  //         <Link to="/settings" className="modal__title modal__title--home">
  //           Settings
  //         </Link>
  //       </div>
  //     </>
  //   );

  return (
    <>
      <div className="modal modal--main">
        <Link to="/game" className="modal__title modal__title--home">
          Play
        </Link>
      </div>
    </>
  );
};

export default Menu;
