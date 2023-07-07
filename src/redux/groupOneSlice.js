import { createSlice } from '@reduxjs/toolkit'

export const groupOneSlice = createSlice({
  name: 'groupOne',
  initialState: {
    groupOneList: []
  },
  reducers: {
    updateGroupOne: (state, action) => {
        state.groupOneList = action.payload
    }
  }
})

export const {updateGroupOne} = groupOneSlice.actions
export default groupOneSlice.reducer