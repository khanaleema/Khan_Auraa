import { configureStore } from "@reduxjs/toolkit";
import khanAuraReducer from "./khanaura"; 

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, khanAuraReducer);

export const store = configureStore({
  reducer: {
    khanaura: persistedReducer, // ✅ Correct reducer name
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
