import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { CartItemProps } from '../redux/slices/pointsSlice';
import { RootState } from '../redux/store';
import Search from './Search';

const Header: React.FC = () => {
  const location = useLocation();
  // const { totalPrice, items } = useSelector((state: RootState) => state.cart);

  // const totalCount = items.reduce(
  //   (sum, item: CartItemProps) => sum + (item.count ? item.count : 0),
  //   0,
  // );

  return (
    <div className="header">
      <div className="container"></div>
    </div>
  );
};

export default Header;
