import { configureStore } from "@reduxjs/toolkit";
import ovenReducer from "./slices/ovenSlice.js";
import controlPanelReducer from "./slices/controlPanelSlice.js";
import previewReducer from "./slices/previewSlice.js";

export const store = configureStore({
  reducer: {
    oven: ovenReducer,
    controlPanel: controlPanelReducer,
    preview: previewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
