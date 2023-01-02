import React, { useState, useRef, useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setSort, SortSlice } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

// type PopupItem = {
//   sortType: string, name: string, sortDirection?: string
// }

type PopupClick = MouseEvent & {
  path: Node[];
};

export const sortList: SortSlice[] = [
  {
    name: 'популярности',
    sortType: 'rating',
  },
  {
    name: 'цене',
    sortType: 'price',
  },
  {
    name: 'алфавиту',
    sortType: 'title',
  },
];
const Sort: FC = () => {
  const dispatch = useDispatch();

  const sortRef = useRef<HTMLDivElement | null>(null);

  const sortType = useSelector((state: RootState) => state.filter.sort);
  const sortDirection = useSelector((state: RootState) => state.filter.sort.sortDirection);

  const sortSelectedName = useSelector((state: RootState) => state.filter.sort.name);

  const [statePopup, setStatePopup] = useState(false);

  useEffect(() => {
    // Did mount
    const handleClickOutside = (event: any) => {
      if (sortRef.current) {
        if (!event.path.includes(sortRef.current)) {
          setStatePopup(false);
        }
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    // Unmount
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const onClickPopupItem = (item: SortSlice) => {
    dispatch(
      setSort({ sortType: item.sortType, name: item.name, sortDirection: sortType.sortDirection }),
    );
    setStatePopup(false);
  };

  // Выбранный вид сортировки
  // const selectedName = sortType.name;

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="12"
          height="8"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={'sort__arrow ' + (sortDirection ? 'active' : '')}
          onClick={() =>
            dispatch(
              setSort({
                sortType: sortType.sortType,
                name: sortType.name,
                sortDirection: !sortDirection,
              }),
            )
          }>
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setStatePopup(!statePopup)}>{sortSelectedName}</span>
      </div>
      {statePopup ? (
        <div className="sort__popup">
          <ul>
            {sortList.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  onClickPopupItem(item);
                }}
                className={item.sortType === sortType.sortType ? 'active' : ''}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Sort;
