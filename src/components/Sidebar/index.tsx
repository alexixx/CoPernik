import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [active, setActive] = useState(true);
  const toggleSidebar = () => {
    if (!active) {
      setActive(true);
    } else {
      setActive(false);
    }
  };
  //   return (
  //     <div className={active ? 'sidebar active' : 'sidebar'}>
  //       {/* <button className="" onClick={() => toggleSidebar()}>
  //         {active ? 'hide' : 'show'}
  //       </button> */}
  //       {/* <div className="profile">
  //         <div className="avatar"></div>
  //         <div className="name">Alexis</div>
  //       </div> */}
  //       <div className="sidebar__list">
  //         <Link to="/" className="sidebar__item">
  //           Home
  //         </Link>
  //         <Link to="/settings" className="sidebar__item">
  //           Settings
  //         </Link>
  //       </div>
  //       <div className="copyright copyright--sidebar">
  //         <a href="https://github.com/alexixx" target="_blank">
  //           by Alexixx
  //         </a>
  //       </div>
  //     </div>
  //   );

  return (
    <div className="sidebar">
      {/* <button className="" onClick={() => toggleSidebar()}>
       {active ? 'hide' : 'show'}
     </button> */}
      {/* <div className="profile">
       <div className="avatar"></div>
       <div className="name">Alexis</div>
     </div> */}
      <div className="sidebar__list">
        <Link to="/" className="sidebar__item">
          Exit
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
