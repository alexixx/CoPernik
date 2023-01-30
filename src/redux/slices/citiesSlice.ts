import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// TYEPS

// INTERFACES

interface CitiesSliceState {
  //   items: PizzaItem[];
  status: 'pending' | 'success' | 'error';
  citiesNames: string[];
  citiesCoords: string[][] | null;
}

// const citiesNames = ['Vladimir', 'Moscow'];
const citiesNames = ['Moscow', 'Vladimir'];

export const fetchCities = createAsyncThunk('pizzas/fetchPizzasStatus', async (params) => {
  // Возможно использовать ThunkAPI для более расширенной работы с запросом
  let finalData = [];
  const getPolygons = async () => {
    let result = [];
    for (let i = 0; i < citiesNames.length; i++) {
      const { data } = await axios.get('http://nominatim.openstreetmap.org/search', {
        params: {
          q: citiesNames[i],
          format: 'json',
          polygon_geojson: 1,
        },
      });

      if (data) {
        // console.log(data);
        let polygon = [];
        for (let i = 0; i < data[0].boundingbox.length; i++) {
          // Increasing the probability of finding a panorama by reducing the size of the polygon
          polygon.push((data[0].boundingbox[i] - 0.025).toFixed(6));
          // polygon.push(data[0].boundingbox)
        }

        result.push(polygon);

        // console.log(result);
      }
    }

    return result;
  };

  //@ts-ignore

  finalData = await getPolygons();
  //   return polygon as PizzaItem[];
  return finalData;
});

const initialState: CitiesSliceState = {
  status: 'pending', // pending, success, error
  citiesNames: ['Vladimir', 'Moscow'],
  citiesCoords: null,
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setItems(state, action) {
      state.citiesCoords = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchCities.pending, (state, action) => {
    //   state.status = 'pending';
    //   state.citiesCoords = [];
    // });

    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.citiesCoords = action.payload;
      state.status = 'success';
    });

    builder.addCase(fetchCities.rejected, (state, action) => {
      state.citiesCoords = [];
      state.status = 'error';
    });
  },
});

// export const selectorPizzas = (selector) => {
//   return (state) => state.pizzas[selector];
// };

//pizzaSlice.actions == pizzaSlice.reducers
export const { setItems } = citiesSlice.actions;

export default citiesSlice.reducer;
