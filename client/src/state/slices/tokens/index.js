import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token0: {
    data: null, 
    count: 0
  },
  token1: {
    data: null,
    count: 0
  }
}

export const tokenSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updateToken0: (state, action) => {
      state.token0 = action.payload
    },
    updateToken1: (state, action) => {
      state.token1 = action.payload
    },
    updateToken0Count: (state, action) => {
      state.token0 = {
        ...state.token0, count: action.payload
      }
    },
    updateToken1Count: (state, action) => {
      state.token1 = {
        ...state.token1, count: action.payload
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateToken0, updateToken1, updateToken0Count, updateToken1Count } = tokenSlice.actions

export default tokenSlice.reducer