import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import type { TypedUseSelectorHook } from 'react-redux';
import { feedApi } from '../modules/feed/api/repository';
import { profileApi } from '../modules/profile/api/repository';
import { authApi } from '../modules/auth/api/repository';
import { authSlice } from '../modules/auth/service/slice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'realworld',
  storage,
};

const persistentReducer = persistReducer(
  persistConfig,
  combineReducers({
    [feedApi.reducerPath]: feedApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [authSlice.name]: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
  })
);

export const store = configureStore({
  reducer: persistentReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(feedApi.middleware, profileApi.middleware, authApi.middleware),
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
