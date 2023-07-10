import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CitiesSliceState {
  status: 'pending' | 'success' | 'error';
  citiesNames: string[];
  citiesCoords: string[][] | null;
}

let citiesNames = ['Moscow', 'Vladimir'];

export const fetchCities = createAsyncThunk('cities/fetchCities', async (params) => {
  // It is possible to use ThunkAPI for more advanced request handling
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
        let polygon = [];
        for (let i = 0; i < data[0].boundingbox.length; i++) {
          // Increasing the probability of finding a panorama by reducing the size of the polygon
          polygon.push((data[0].boundingbox[i] - 0.045).toFixed(6));
        }
        result.push(polygon);
      }
    }

    return result;
  };

  //@ts-ignore

  finalData = await getPolygons();
  return finalData;
});

const initialState: CitiesSliceState = {
  status: 'pending', // pending, success, error
  citiesNames: [],
  citiesCoords: null,
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setItems(state, action) {
      state.citiesCoords = action.payload;
    },
    setCities(state, action) {
      citiesNames = [action.payload];
      state.citiesNames = [action.payload];
    },
    resetCoords(state) {
      state.citiesCoords = null;
    },
    resetCities(state) {
      state.citiesNames = [];
    },
  },
  extraReducers: (builder) => {
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

export const { setItems, setCities, resetCoords, resetCities } = citiesSlice.actions;
export default citiesSlice.reducer;
