import { configureStore } from "@reduxjs/toolkit";
import systemReducer from '@/lib/features/theme/themeSlice'

export const store = configureStore({
    reducer: systemReducer
})