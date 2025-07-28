import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type OvenPhase =
  | "idle"
  | "preheating"
  | "waiting"
  | "cooking"
  | "paused"
  | "done";

interface OvenState {
  // Temperature settings
  targetTemperature: number;
  currentTemperature: number;
  temperatureRange: [number, number];

  // Timer settings
  timerMs: number;
  remainingMs: number;

  // Oven status
  phase: OvenPhase;
  isRunning: boolean;
  isDoorLocked: boolean;

  // Current conditions
  currentAmbientTemp: number;

  // Backend fields
  ovenOn: boolean;
  mode: string;
  bakeType: string;
  isPreheating: boolean;
  isCooking: boolean;
  lockDoor: boolean;
  childDetected: boolean;
  fanOn: boolean;
  topHeaterOn: boolean;
  bottomHeaterOn: boolean;
  estimatedPreheatTime: number;
  heatTime: number;
  cookingTimeRemaining: number;
  timestamp: number;
  lastUpdatedBy: string | null;
  activeRecipeId: string | null;
  leftDial: string;
  rightDial: string;
  centerStatus: string;
}

const initialState: OvenState = {
  targetTemperature: 170,
  currentTemperature: 79,
  temperatureRange: [70, 550],
  timerMs: 10 * 60 * 1000, // 10 minutes default
  remainingMs: 10 * 60 * 1000,
  phase: "idle",
  isRunning: false,
  isDoorLocked: false,
  currentAmbientTemp: 79,
  // Backend fields
  ovenOn: false,
  mode: "off",
  bakeType: "standard",
  isPreheating: false,
  isCooking: false,
  lockDoor: false,
  childDetected: false,
  fanOn: false,
  topHeaterOn: false,
  bottomHeaterOn: false,
  estimatedPreheatTime: 0,
  heatTime: 0,
  cookingTimeRemaining: 0,
  timestamp: 0,
  lastUpdatedBy: null,
  activeRecipeId: null,
  leftDial: "70°F",
  rightDial: "--",
  centerStatus: "Oven is Off",
};

const ovenSlice = createSlice({
  name: "oven",
  initialState,
  reducers: {
    setOvenState: (state, action: PayloadAction<Partial<OvenState>>) => {
      Object.assign(state, action.payload);
    },
    setTargetTemperature: (state, action: PayloadAction<number>) => {
      state.targetTemperature = action.payload;
    },
    setCurrentTemperature: (state, action: PayloadAction<number>) => {
      state.currentTemperature = action.payload;
    },
    setTemperatureRange: (state, action: PayloadAction<[number, number]>) => {
      state.temperatureRange = action.payload;
    },
    setTimerMs: (state, action: PayloadAction<number>) => {
      state.timerMs = action.payload;
      state.remainingMs = action.payload;
    },
    setRemainingMs: (state, action: PayloadAction<number>) => {
      state.remainingMs = action.payload;
    },
    setPhase: (state, action: PayloadAction<OvenPhase>) => {
      state.phase = action.payload;

      // Auto-manage running state based on phase
      state.isRunning = ["preheating", "cooking"].includes(action.payload);

      // Auto-manage door lock based on phase
      state.isDoorLocked = ["preheating", "waiting", "cooking"].includes(
        action.payload
      );
    },
    setIsRunning: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload;

      // Update phase based on running state
      if (!action.payload && state.phase === "cooking") {
        state.phase = "paused";
      } else if (action.payload && state.phase === "paused") {
        state.phase = "cooking";
      }
    },
    setDoorLocked: (state, action: PayloadAction<boolean>) => {
      state.isDoorLocked = action.payload;

      // If unlocking during cooking, pause the oven
      if (!action.payload && state.phase === "cooking") {
        state.phase = "paused";
        state.isRunning = false;
      }
    },
    startOven: (state) => {
      state.phase = "preheating";
      state.isRunning = true;
      state.isDoorLocked = true;
    },
    stopOven: (state) => {
      state.phase = "idle";
      state.isRunning = false;
      state.isDoorLocked = false;
      state.remainingMs = state.timerMs; // Reset timer
    },
    completePreheating: (state) => {
      if (state.phase === "preheating") {
        state.phase = "waiting";
      }
    },
    startCooking: (state) => {
      if (state.phase === "waiting") {
        state.phase = "cooking";
        state.isRunning = true;
      }
    },
    completeTimer: (state) => {
      state.phase = "done";
      state.isRunning = false;
      state.remainingMs = 0;
    },
    incrementTimer: (state, action: PayloadAction<number>) => {
      const increment = action.payload;
      state.timerMs = Math.min(state.timerMs + increment, 6 * 60 * 60 * 1000); // Max 6 hours
      state.remainingMs = state.timerMs;
    },
    decrementTimer: (state, action: PayloadAction<number>) => {
      const decrement = action.payload;
      state.timerMs = Math.max(state.timerMs - decrement, 60 * 1000); // Min 1 minute
      state.remainingMs = state.timerMs;
    },
  },
});

export const {
  setOvenState,
  setTargetTemperature,
  setCurrentTemperature,
  setTemperatureRange,
  setTimerMs,
  setRemainingMs,
  setPhase,
  setIsRunning,
  setDoorLocked,
  startOven,
  stopOven,
  completePreheating,
  startCooking,
  completeTimer,
  incrementTimer,
  decrementTimer,
} = ovenSlice.actions;

export default ovenSlice.reducer;
