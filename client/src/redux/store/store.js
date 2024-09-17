import { configureStore } from '@reduxjs/toolkit'
import messageSlice from "../slices/messageSlices"

const store = configureStore({
    reducer: messageSlice,
})

export default store