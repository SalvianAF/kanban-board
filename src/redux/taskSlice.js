import { createSlice } from '@reduxjs/toolkit'

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    taskList: []
  },
  reducers: {
    updateTasks: (state, action) => {
        state.taskList = action.payload
        // console.log("pppp")
        // console.log(action.payload)
    }
  }
})

export const {updateTasks} = taskSlice.actions
export default taskSlice.reducer