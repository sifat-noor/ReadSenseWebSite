import { configureStore } from  "@reduxjs/toolkit";
import { readerSlice } from  "./readerSlice";
import { readerTrackingSlice } from  "./readerTrackingSlice";
import { sessionSlice } from  "./sessionSlice";
import { createWrapper,  } from  "next-redux-wrapper";
import { signalRMiddleware } from './signalRMiddleware';

const makeStore = () =>
  configureStore({
    reducer: {
      [readerSlice.name]: readerSlice.reducer,
      [readerTrackingSlice.name]: readerTrackingSlice.reducer,
      [sessionSlice.name]: sessionSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(signalRMiddleware),
    devTools: true,
  });

  export type AppStore = ReturnType<typeof makeStore>;
  export type AppState = ReturnType<AppStore["getState"]>;
  export const wrapper = createWrapper<AppStore>(makeStore);