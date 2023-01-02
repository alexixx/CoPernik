import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

import { setDataPagination } from '../../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

const Pagination: FC = () => {
  const dispatch = useDispatch();
  const dataPagination = useSelector((state: { filter: any }) => state.filter.pagination);

  console.log(dataPagination);

  const onChangePage = (event: { selected: number }) => {
    dispatch(
      setDataPagination({
        currentPage: event.selected + 1,
        pageCount: dataPagination.pageCount,
        pageRangeDisplayed: dataPagination.pageRangeDisplayed,
      }),
    );

    return event.selected + 1;
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Вперед"
      onPageChange={(event) => onChangePage(event)}
      pageRangeDisplayed={dataPagination.pageRangeDisplayed}
      pageCount={dataPagination.pageCount}
      previousLabel="Назад"
      className={styles.pagination}
    />
  );
};

export default Pagination;
