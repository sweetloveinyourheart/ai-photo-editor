import { createSlice } from '@reduxjs/toolkit'
// Define a type for the slice state
interface CounterState {
    editorRef: any
}

// Define the initial state using that type
const initialState: CounterState = {
    editorRef: null
}

export const counterSlice = createSlice({
    name: 'counter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
})

export const { } = counterSlice.actions
export default counterSlice.reducer