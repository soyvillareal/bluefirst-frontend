import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import sessionsReducer from './features/sessions/sessions.slice';
// import usersReducer from './features/users/users.slice';
import { api } from './api';
import env from './env';

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
  // users: usersReducer,
  session: sessionsReducer,

  [api.reducerPath]: api.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: env.IS_DEV,
    middleware: (getDefaultMiddleware) => {
      const middlewares = [api.middleware];

      // add logger only for dev
      if (env.IS_DEV) {
        middlewares.push(logger);
      }

      return getDefaultMiddleware().concat(middlewares);
    },
  });
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
