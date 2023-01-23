import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartItemProps } from './pointsSlice';

// TYEPS

type Sort = {
  name: string;
  sortType: 'rating' | 'title' | 'price';
  sortDirection: boolean;
};

type Pagination = {
  currentPage: number;
  pageCount: number;
  pageRangeDisplayed: number;
};

type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

// INTERFACES

interface Params {
  sort: Sort;
  categoryId: number;
  dataPagination: Pagination;
  search: string;
}

interface PizzaSliceState {
  items: PizzaItem[];
  status: 'pending' | 'success' | 'error';
}

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params: Params) => {
  // Возможно использовать ThunkAPI для более расширенной работы с запросом

  const { sort, categoryId, dataPagination, search } = params;

  let sortOrderBy = 'test';

  switch (sort.sortType) {
    case 'rating':
      sortOrderBy = '&sortBy=rating';
      break;
    case 'price':
      sortOrderBy = '&sortBy=price';
      break;
    case 'title':
      sortOrderBy = '&sortBy=title';
      break;

    default:
      break;
  }

  // const { data } = await axios.get(
  //   `https://632a40a7713d41bc8e6ccd58.mockapi.io/items?${
  //     (categoryId ? `category=${categoryId}` : '') + sortOrderBy
  //   }&order=${sort.sortDirection ? 'desc' : 'asc'}${
  //     sort.search ? `&search=${sort.search}` : ''
  //   }&page=${dataPagination.currentPage}&limit=${dataPagination.pageRangeDisplayed}`,
  // );

  const { data } = await axios.get(
    `https://632a40a7713d41bc8e6ccd58.mockapi.io/items?${
      (categoryId ? `category=${categoryId}` : '') + sortOrderBy
    }&order=${sort.sortDirection ? 'desc' : 'asc'}${search ? `&search=${search}` : ''}&page=${
      dataPagination.currentPage
    }`,
  );

  return data as PizzaItem[];
});

const initialState: PizzaSliceState = {
  items: [],
  status: 'pending', // pending, success, error
};

const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = 'pending';
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.items = [];
      state.status = 'error';
    });
  },
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.items = [];
  //     state.status = 'pending';
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.items = [];
  //     state.status = 'error';
  //   },
  // },
});

// export const selectorPizzas = (selector) => {
//   return (state) => state.pizzas[selector];
// };

//pizzaSlice.actions == pizzaSlice.reducers
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
