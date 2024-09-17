import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    rightMessageArray: [],
    leftmessageArray: [],
    fullMessageArray: []

}

export const cartSlice = createSlice({
    name: 'hathi',
    initialState,
    reducers: {
        rightMessageData: (state, action) => {
            state.rightMessageArray = [...state.rightMessageArray, action.payload];
            state.fullMessageArray.push({
                right: action.payload
            })
        },
        leftMessageData: (state, action) => {
            state.leftmessageArray = [...state.leftmessageArray, action.payload];
            state.fullMessageArray.push({
                left: action.payload
            })
        },



    },
})

// Action creators are generated for each case reducer function
export const { rightMessageData, leftMessageData } = cartSlice.actions

export default cartSlice.reducer