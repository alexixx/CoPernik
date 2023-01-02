import { useState, useEffect, useRef, useCallback, FC } from 'react';
import qs from 'qs';

import Sort, { sortList } from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { useNavigate, Link } from 'react-router-dom';
import { RootState } from '../redux/store';

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export const Home: FC = () => {
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  // const sort = useSelector((state: RootState) => state.filter.sort);
  const dataPagination = useSelector((state: RootState) => state.filter.pagination);
  // const search = useSelector((state: RootState) => state.filter.search);

  const { categoryId, sort, search } = useSelector((state: RootState) => state.filter);

  const pizzas = useSelector((state: RootState) => state.pizzas.items);
  const status = useSelector((state: RootState) => state.pizzas.status);

  // const { pizzas, status } = useSelector((state: RootState) => state.pizzas);

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.replace(/^./gim, ''));
      const sort = sortList.find((obj) => obj.sortType === params.sortType);

      if (sort && params) {
        dispatch(
          setFilters({
            sort,
            categoryId: Number(params.categoryId),
            pagination: {
              currentPage: Number(params.currentPage),
              pageCount: dataPagination.pageCount,
              pageRangeDisplayed: dataPagination.pageRangeDisplayed,
            },
            search: search,
          }),
        );
      }

      isSearch.current = true;
    }
  }, []);

  const getPizzas = async () => {
    try {
      // @ts-ignore
      dispatch(fetchPizzas({ categoryId, sort, dataPagination, search }));
    } catch (error) {}

    // dispatch(setPageCount(Math.ceil(pizzas.length / dataPagination.pageRangeDisplayed)));
  };

  useEffect(() => {
    if (!isSearch.current) getPizzas();
    isSearch.current = false;
  }, [categoryId, sort, dataPagination, search]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType: sort.sortType,
        categoryId,
        page: dataPagination.currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, dataPagination, search]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id) => onChangeCategory(id)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items content__items--home">
        {status === 'pending' ? (
          [...new Array(6)].map((item, index) => <Skeleton key={index} />)
        ) : pizzas.length ? (
          pizzas.map((obj: PizzaBlockProps) => <PizzaBlock key={obj.id} {...obj} />)
        ) : (
          <h2 className="content__title--center">Такую еще не придумали 😊</h2>
        )}
      </div>

      <Pagination />
    </>
  );
};

export default Home;
