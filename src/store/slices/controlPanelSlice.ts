import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ControlPanelState {
  selectedMode: string | null;
  selectedOption: string | null;
  expandedPanel: string | null;
  isPreviewMode: boolean;

  // Available modes and their options
  availableModes: {
    [key: string]: string[];
  };
}

const initialState: ControlPanelState = {
  selectedMode: null,
  selectedOption: null,
  expandedPanel: null,
  isPreviewMode: true,

  availableModes: {
    Bake: ["Traditional", "Convection", "European Convection"],
    Broil: ["High", "Medium", "Low"],
    Recipe: ["Pizza", "Bread", "Cookies", "Roast"],
  },
};

const controlPanelSlice = createSlice({
  name: "controlPanel",
  initialState,
  reducers: {
    setSelectedMode: (state, action: PayloadAction<string | null>) => {
      state.selectedMode = action.payload;

      // Auto-select first option when mode changes
      if (action.payload && state.availableModes[action.payload]) {
        state.selectedOption = state.availableModes[action.payload][0];
      } else {
        state.selectedOption = null;
      }
    },
    setSelectedOption: (state, action: PayloadAction<string | null>) => {
      state.selectedOption = action.payload;
    },
    setExpandedPanel: (state, action: PayloadAction<string | null>) => {
      state.expandedPanel = action.payload;
    },
    togglePreviewMode: (state) => {
      state.isPreviewMode = !state.isPreviewMode;
    },
    setPreviewMode: (state, action: PayloadAction<boolean>) => {
      state.isPreviewMode = action.payload;
    },
    closeAllPanels: (state) => {
      state.expandedPanel = null;
    },
    resetControlPanel: (state) => {
      state.selectedMode = null;
      state.selectedOption = null;
      state.expandedPanel = null;
    },
  },
});

export const {
  setSelectedMode,
  setSelectedOption,
  setExpandedPanel,
  togglePreviewMode,
  setPreviewMode,
  closeAllPanels,
  resetControlPanel,
} = controlPanelSlice.actions;

export default controlPanelSlice.reducer;
