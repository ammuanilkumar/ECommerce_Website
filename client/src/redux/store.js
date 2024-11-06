import { configureStore } from '@reduxjs/toolkit'
import  counterReducer from './features/counterSlice';
//import productReducer from './features/productSlice '
import productReducer from "./features/productSlice"
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product : productReducer,
  },
})