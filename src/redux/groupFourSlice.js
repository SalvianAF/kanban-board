import { createSlice } from '@reduxjs/toolkit'

export const groupFourSlice = createSlice({
  name: 'groupFour',
  initialState: {
    groupFourList: []
  },
  reducers: {
    updateGroupFour: (state, action) => {
        state.groupFourList = action.payload
        // console.log("pppp")
        // console.log(action.payload)
    }
  }
})

export const {updateGroupFour} = groupFourSlice.actions
export default groupFourSlice.reducer