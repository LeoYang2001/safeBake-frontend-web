import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type OvenPhase =
  | "idle"
  | "preheating"
  | "waiting"
  | "cooking"
  | "paused"
  | "done";

interface OvenState {
  // Backend fields (match backend naming and types)
  ovenOn: boolean;
  lockDoor: boolean;
  phase: OvenPhase;
  centerStatus: string;
  currentTemp: number;
  targetTemp: number;
  mode: string;
  isPreheating: boolean;
  estimatedPreheatTime: number;
  isCooking: boolean;
  estimatedCookingTime: number;
  fanOn: boolean;
  topHeaterOn: boolean;
  bottomHeaterOn: boolean;
}

const initialState: OvenState = {
  ovenOn: false,
  lockDoor: false,
  phase: "idle",
  centerStatus: "Oven is Off",
  currentTemp: 70,
  targetTemp: 70,
  mode: "off",
  isPreheating: false,
  estimatedPreheatTime: 0,
  isCooking: false,
  estimatedCookingTime: 0,
  fanOn: false,
  topHeaterOn: false,
  bottomHeaterOn: false,
};

const ovenSlice = createSlice({
  name: "oven",
  initialState,
  reducers: {
    setOvenState: (state, action: PayloadAction<Partial<OvenState>>) => {
      Object.assign(state, action.payload);
    },
    setPhase: (state, action: PayloadAction<OvenPhase>) => {
      state.phase = action.payload;
    },
  },
});

export const { setOvenState, setPhase } = ovenSlice.actions;

export function mapOvenStateToBackend(state: OvenState) {
  return {
    ovenOn: state.ovenOn,
    lockDoor: state.lockDoor,
    phase: state.phase,
    centerStatus: state.centerStatus,
    currentTemp: state.currentTemp,
    targetTemp: state.targetTemp,
    mode: state.mode,
    isPreheating: state.isPreheating,
    estimatedPreheatTime: state.estimatedPreheatTime,
    isCooking: state.isCooking,
    estimatedCookingTime: state.estimatedCookingTime,
    fanOn: state.fanOn,
    topHeaterOn: state.topHeaterOn,
    bottomHeaterOn: state.bottomHeaterOn,
  };
}

export default ovenSlice.reducer;
