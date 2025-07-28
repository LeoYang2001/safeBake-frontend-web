import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PreviewState {
  isVisible: boolean;

  // Oven preview elements state
  elements: {
    topElement: boolean;
    bottomElement: boolean;
    convectionFan: boolean;
    broilerElement: boolean;
    lightElement: boolean;
  };

  // Animation states
  fanSpeed: number; // 0-100
  elementIntensity: number; // 0-100

  // Custom configurations for different modes
  customConfigs: {
    [key: string]: {
      [key: string]: {
        topElement: boolean;
        bottomElement: boolean;
        convectionFan: boolean;
        broilerElement: boolean;
        lightElement: boolean;
        fanSpeed: number;
        elementIntensity: number;
      };
    };
  };
}

const initialState: PreviewState = {
  isVisible: true,

  elements: {
    topElement: false,
    bottomElement: false,
    convectionFan: false,
    broilerElement: false,
    lightElement: true, // Light is usually on when oven is active
  },

  fanSpeed: 0,
  elementIntensity: 0,

  customConfigs: {
    Bake: {
      Traditional: {
        topElement: true,
        bottomElement: true,
        convectionFan: false,
        broilerElement: false,
        lightElement: true,
        fanSpeed: 0,
        elementIntensity: 70,
      },
      Convection: {
        topElement: true,
        bottomElement: true,
        convectionFan: true,
        broilerElement: false,
        lightElement: true,
        fanSpeed: 80,
        elementIntensity: 60,
      },
      "European Convection": {
        topElement: false,
        bottomElement: true,
        convectionFan: true,
        broilerElement: false,
        lightElement: true,
        fanSpeed: 90,
        elementIntensity: 80,
      },
    },
    Broil: {
      High: {
        topElement: false,
        bottomElement: false,
        convectionFan: false,
        broilerElement: true,
        lightElement: true,
        fanSpeed: 0,
        elementIntensity: 100,
      },
      Medium: {
        topElement: false,
        bottomElement: false,
        convectionFan: false,
        broilerElement: true,
        lightElement: true,
        fanSpeed: 0,
        elementIntensity: 70,
      },
      Low: {
        topElement: false,
        bottomElement: false,
        convectionFan: false,
        broilerElement: true,
        lightElement: true,
        fanSpeed: 0,
        elementIntensity: 40,
      },
    },
    Recipe: {
      Pizza: {
        topElement: true,
        bottomElement: true,
        convectionFan: true,
        broilerElement: false,
        lightElement: true,
        fanSpeed: 85,
        elementIntensity: 90,
      },
      Bread: {
        topElement: true,
        bottomElement: true,
        convectionFan: false,
        broilerElement: false,
        lightElement: true,
        fanSpeed: 0,
        elementIntensity: 75,
      },
      Cookies: {
        topElement: true,
        bottomElement: true,
        convectionFan: true,
        broilerElement: false,
        lightElement: true,
        fanSpeed: 70,
        elementIntensity: 65,
      },
      Roast: {
        topElement: true,
        bottomElement: true,
        convectionFan: true,
        broilerElement: false,
        lightElement: true,
        fanSpeed: 60,
        elementIntensity: 80,
      },
    },
  },
};

const previewSlice = createSlice({
  name: "preview",
  initialState,
  reducers: {
    setPreviewVisible: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
    setElementState: (
      state,
      action: PayloadAction<{
        element: keyof PreviewState["elements"];
        active: boolean;
      }>
    ) => {
      state.elements[action.payload.element] = action.payload.active;
    },
    setFanSpeed: (state, action: PayloadAction<number>) => {
      state.fanSpeed = Math.min(Math.max(action.payload, 0), 100);
    },
    setElementIntensity: (state, action: PayloadAction<number>) => {
      state.elementIntensity = Math.min(Math.max(action.payload, 0), 100);
    },
    applyModeConfig: (
      state,
      action: PayloadAction<{ mode: string; option: string }>
    ) => {
      const { mode, option } = action.payload;
      const config = state.customConfigs[mode]?.[option];

      if (config) {
        state.elements = {
          topElement: config.topElement,
          bottomElement: config.bottomElement,
          convectionFan: config.convectionFan,
          broilerElement: config.broilerElement,
          lightElement: config.lightElement,
        };
        state.fanSpeed = config.fanSpeed;
        state.elementIntensity = config.elementIntensity;
      }
    },
    resetPreview: (state) => {
      state.elements = {
        topElement: false,
        bottomElement: false,
        convectionFan: false,
        broilerElement: false,
        lightElement: true,
      };
      state.fanSpeed = 0;
      state.elementIntensity = 0;
    },
    setAllElementsOff: (state) => {
      state.elements = {
        topElement: false,
        bottomElement: false,
        convectionFan: false,
        broilerElement: false,
        lightElement: false,
      };
      state.fanSpeed = 0;
      state.elementIntensity = 0;
    },
  },
});

export const {
  setPreviewVisible,
  setElementState,
  setFanSpeed,
  setElementIntensity,
  applyModeConfig,
  resetPreview,
  setAllElementsOff,
} = previewSlice.actions;

export default previewSlice.reducer;
