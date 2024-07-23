import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { shazamCoreApiCharts, shazamCoreApiArtists } from './services/shazamCore';

export const store = configureStore({
  reducer: {
    [shazamCoreApiCharts.reducerPath]: shazamCoreApiCharts.reducer,
    [shazamCoreApiArtists.reducerPath]: shazamCoreApiArtists.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        shazamCoreApiCharts.middleware, 
        shazamCoreApiArtists.middleware
    ),
});