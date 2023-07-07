import { createSlice } from '@reduxjs/toolkit'

export const endpointSlice = createSlice({
  name: 'endpoint',
  initialState: {
    url: "https://todo-api-18-140-52-65.rakamin.com/todos/",
    token: {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozMTksImV4cCI6MTY5NzA3OTk4N30.pKtcR893pr8F081oWyymr3b4mDhMXCu7PqGKh2A-hfM` }
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