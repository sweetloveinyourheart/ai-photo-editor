import { configureStore } from '@reduxjs/toolkit'
import editorSlide from './slices/editorSlide'

const store = configureStore({
  reducer: {
    editor: editorSlide
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store