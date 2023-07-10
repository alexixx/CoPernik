import { FC } from 'react';
import { Link } from 'react-router-dom';

const Sidebar: FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__list">
        <Link to="/" className="sidebar__item">
          Exit
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
