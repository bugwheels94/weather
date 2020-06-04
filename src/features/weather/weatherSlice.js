import { createSlice } from '@reduxjs/toolkit';

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    cities: [],
    addCityReq: {},
    city: null,
    refreshCityReq: {},   // this will be a store for each city hence it is an object
    getCityReq: {},
  },
  reducers: {
    addCity: (state, action) => {
          if (state.cities.findIndex(city => city.name === action.payload.name) !== -1) {
            state.addCityReq = { error: 'City Exists'}
      } else {
        state.cities.unshift(action.payload);
        if (state.cities.length > 8) state.cities.pop();
        state.addCityReq = {};  
      }
    },
    addCityPending: (state, action) => {
      state.addCityReq = { pending: true }
    },
    addCityFailed: (state, action) => {
      state.addCityReq = { error: action.payload }
    },
    refreshCity: (state, action) => {
      state.cities = state.cities.map(city => city.name === action.payload.name ? action.payload : city);
      delete state.refreshCityReq[action.payload.name];
    },
    refreshCityPending: (state, city) => {
      state.refreshCityReq[city] = { pending: true }
    },
    refreshCityFailed: (state, action) => {
      state.refreshCityReq[action.payload] = { error: true }
    },
    removeCity: (state, action) => {
      state.cities = state.cities.filter(city => city.name !== action.payload);
    },
    getCity: (state, action) => {
      const current = state.cities.find(city => city.name === action.payload.city.name);
      if (current) {
        action.payload.list.shift()
        state.city = {
          forecast: action.payload,
          current
        }  
        state.getCityReq = {};      
      } else {
        state.getCityReq = { error: 'City Does Not Exist' }
      }
    },
    getCityPending: (state, action) => {
      state.getCityReq = { pending: true };      
    },
    getCityFailed: (state, action) => {
      state.getCityReq = { error: action.payload };      
    },
  },
});

const { addCityPending, addCityFailed, addCity, 
        refreshCityPending, refreshCityFailed, refreshCity,
        getCityPending, getCity, getCityFailed, } = weatherSlice.actions;
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const { removeCity } = weatherSlice.actions;

export const addCityAsync = city => dispatch => {
  dispatch(addCityPending())
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_ID}`).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    } 
    return res.json()
  }).then(json => {
    dispatch(addCity(json))    
  }).catch(e => dispatch(addCityFailed(e.message)))
};
export const refreshCityAsync = city => dispatch => {
  dispatch(refreshCityPending(city))
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_ID}`).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }    
    return res.json()
  }).then(json => {
    dispatch(refreshCity(json))
  }).catch(e => dispatch(refreshCityFailed(e.message)))
};
export const getCityAsync = city => dispatch => {
  dispatch(getCityPending())
  fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=6&appid=${process.env.REACT_APP_API_ID}`).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }    
    return res.json()
  }).then(json => {
    dispatch(getCity(json))    
  }).catch(e => dispatch(getCityFailed(e.message)))
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.weather.value)`
// export const selectCount = state => state.weather.value;

export default weatherSlice.reducer;
