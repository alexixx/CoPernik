import React, { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useCallback, FC } from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';

import { setSearchValue } from '../../redux/slices/filterSlice';

export const Search:FC = () => {
  const [searchValueLocal, setSearchValueLocal] = useState('');

  const inputSearch = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const sort = useSelector((state: {
    filter: any
  }) => state.filter.sort);

  const clearInput = () => {
    dispatch(setSearchValue(''));
    // inputSearch.current.value = '';
    setSearchValueLocal('');

    inputSearch.current?.focus();
  };

  const changeInput = (value: string) => {
    
    setSearchValueLocal(value);
    updateInput(value);
  };

  const updateInput = useCallback(
    debounce((value) => {
      
      dispatch(setSearchValue(value));
    }, 1000),
    [],
  );

  return (
    <div className={styles.search}>
      <input
        ref={inputSearch}
        type="text"
        placeholder="Поиск"
        value={searchValueLocal}
        onChange={(event) => changeInput(event.target.value)}
        className={styles.search__input}
      />
      {sort.search ? <div className={styles.search__btn} onClick={() => clearInput()}></div> : ''}
    </div>
  );
};

export default Search;
