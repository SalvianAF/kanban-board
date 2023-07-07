import { createSlice } from '@reduxjs/toolkit'

export const groupTwoSlice = createSlice({
  name: 'groupTwo',
  initialState: {
    groupTwoList: []
  },
  reducers: {
    updateGroupTwo: (state, action) => {
        state.groupTwoList = action.payload
    }
  }
})

export const {updateGroupTwo} = groupTwoSlice.actions
export default groupTwoSlice.reducer