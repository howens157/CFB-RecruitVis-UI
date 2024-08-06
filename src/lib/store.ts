import { configureStore } from '@reduxjs/toolkit'
import colorReducer from './colorSlice'
import typographyReducer from "./typographySlice"
import layoutReducer from "./layoutSlice"


export const makeStore = () => {
  return configureStore({
    reducer: {
      color: colorReducer,
      typography: typographyReducer,
      layout: layoutReducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
