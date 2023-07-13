import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false
}

export const loadingSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updateLoading: (state, action) => {
        state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateLoading } = loadingSlice.actions

export default loadingSlice.reducer