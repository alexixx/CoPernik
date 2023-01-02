import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// TYEPS

export type SortSlice = {
  name: string,
  sortType: 'rating' | 'title' | 'price',
  // sortType: string,
  sortDirection?: boolean
}

type Pagination = {
  currentPage: number,
  pageCount: number,
  pageRangeDisplayed: number
}


// INTERFACES

interface FilterSliceState {
  categoryId: number,
  sort: SortSlice,
  pagination: Pagination,
  search: string
}

const initialState: FilterSliceState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortType: 'rating',
    sortDirection: true,    
  },
  pagination: {
    currentPage: 1,
    pageCount: 3,
    pageRangeDisplayed: 4,
  },
  search: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<SortSlice>) {
      state.sort = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setDataPagination(state, action: PayloadAction<Pagination>) {
      state.pagination = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pagination.pageCount = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
      if (action.payload.pagination) {
        state.pagination = action.payload.pagination;
      }
    },
  },
});

//filterSlice.actions == filterSlice.reducers
export const {
  setCategoryId,
  setSort,
  setSearchValue,
  setDataPagination,
  setPageCount,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
