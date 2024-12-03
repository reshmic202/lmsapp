import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userSlice from './userslice';



// Combine Reducers
const rootReducer = combineReducers({
    userInformation: userSlice.reducer,
});

// Configure Store
export const store = configureStore({
    reducer: rootReducer,
});


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Custom Hooks for Dispatch and Selector with Types
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


