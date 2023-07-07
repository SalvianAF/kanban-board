import { createSlice } from '@reduxjs/toolkit'

export const groupThreeSlice = createSlice({
  name: 'groupThree',
  initialState: {
    groupThreeList: []
  },
  reducers: {
    updateGroupThree: (state, action) => {
        state.groupThreeList = action.payload
    }
  }
})

export const {updateGroupThree} = groupThreeSlice.actions
export default groupThreeSlice.reducer