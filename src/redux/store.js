import { configureStore } from '@reduxjs/toolkit';
import cvInfoReducer from './cvInfoSlice.js';

export default configureStore({
  reducer: {
    cvInfo: cvInfoReducer,
    // Add the reducer here
  },
});
