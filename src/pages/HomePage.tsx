import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  setTargetTemperature,
  setIsRunning,
  setPhase,
  setTimerMs,
  setRemainingMs,
  setOvenState,
} from "../store/slices/ovenSlice";
import OvenDialProp from "../components/common/OvenDialProp";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import ControlPanel from "../components/controlPanel/ControlPanel";
import DoorLockBtn from "../components/common/DoorLockBtn";
import OvenPreview from "../components/ovenPreview/OvenPreview";
import OvenTimerProp from "../components/common/OvenTimerProp";
import OvenTimerDial from "../components/common/OvenTimerDial";
import { useEffect } from "react";
import { fetchOvenStatus } from "../api/ovenApi";
import { connectToOvenUpdates } from "../api/ovenSse";

function HomePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initial fetch (optional, for first load)
    fetchOvenStatus().then((data) => {
      dispatch(setOvenState(data));
    });

    // Connect to SSE for real-time updates
    const eventSource = connectToOvenUpdates();
    return () => eventSource.close();
  }, [dispatch]);

  // Redux state selectors
  const {
    targetTemperature,
    temperatureRange,
    isRunning,
    currentAmbientTemp,
    phase,
  } = useAppSelector((state) => state.oven);

  const { isPreviewMode } = useAppSelector((state) => state.controlPanel);

  // Action handlers
  const handleTemperatureChange = (value: React.SetStateAction<number>) => {
    const newTemp =
      typeof value === "function" ? value(targetTemperature) : value;
    dispatch(setTargetTemperature(newTemp));
  };

  const handleOvenRunningChange = (running: boolean) => {
    dispatch(setIsRunning(running));
  };
  return (
    <div className=" w-full flex-1 flex flex-col ">
      <div className=" flex flex-row items-center justify-between">
        <TextGenerateEffect
          fontSize={36}
          words="SafeBake - Your Smart Baking Companion"
          className="font-normal"
        />
        <span className="   font-normal opacity-70">
          Currently: {currentAmbientTemp} °F
        </span>
      </div>
      <div className=" flex-1/2 w-full  flex flex-row items-center justify-between">
        <OvenDialProp
          setCurrentValue={handleTemperatureChange}
          currentValue={targetTemperature}
          range={temperatureRange}
          valueLabel={`${targetTemperature} °F`}
          size={250}
        />
        <div className=" flex flex-1  h-[70%]  justify-center items-center relative">
          {isPreviewMode && <OvenPreview />}
          <div
            className=" flex z-10 transition-all duration-500 ease-in-out"
            style={
              isPreviewMode
                ? {
                    position: "absolute",
                    top: "0%",
                    right: "0%",
                    transform: "translate(0%, 50%)",
                  }
                : {
                    position: "absolute",
                    top: "50%",
                    right: "50%",
                    transform: "translate(50%, -50%)",
                  }
            }
          >
            <DoorLockBtn
              isOvenRunning={isRunning}
              setIsOvenRunning={handleOvenRunningChange}
              ifOvenPreview={isPreviewMode}
            />
          </div>
        </div>
        <OvenTimerProp size={250} direction="right" />
      </div>
      <div className="w-full  flex-1  flex flex-row items-center  justify-center">
        <ControlPanel />
      </div>
      {process.env.NODE_ENV === "development" && (
        <div
          style={{
            background: "#18181b",
            color: "#fff",
            fontSize: 12,
            padding: 16,
            margin: 16,
            borderRadius: 8,
            maxHeight: 300,
            overflow: "auto",
            fontFamily: "monospace",
            boxShadow: "0 2px 8px #0002",
          }}
        >
          <b>Oven Redux State (Live):</b>
          <pre style={{ margin: 0 }}>
            {JSON.stringify(
              useAppSelector((state) => state.oven),
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
}

export default HomePage;
