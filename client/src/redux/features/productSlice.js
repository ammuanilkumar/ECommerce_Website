import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 products : [],
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProductList :(state,action)=>{
      state.products = action.payload;

    },




    // increment: (state) => {
      
    //   state.value = state.value +1;
      
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { fetchProductList} = productSlice.actions

export default productSlice.reducer