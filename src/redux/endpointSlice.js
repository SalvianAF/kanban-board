import { createSlice } from '@reduxjs/toolkit'

export const endpointSlice = createSlice({
  name: 'endpoint',
  initialState: {
    url: "https://todo-api-18-140-52-65.rakamin.com/todos/",
    token: {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozNDcsImV4cCI6MTY5NzM0Mjk5NH0.s3snyz8ZIdAIhjWlCewDi3zDdJthX31K8LQQiYftaW4` }
    }
  },
  reducers: {
    updateEndpoint: (state, action) => {
        state.url = action.payload
    }
  }
})

export const {updateEndpoint} = endpointSlice.actions
export default endpointSlice.reducer