import { Blend, Flame, Power, Zap, Eye } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  setSelectedMode,
  setSelectedOption,
  setExpandedPanel,
  togglePreviewMode,
} from "../../store/slices/controlPanelSlice";
import { applyModeConfig } from "../../store/slices/previewSlice";

function ControlPanel() {
  const dispatch = useAppDispatch();

  // Get state from Redux
  const {
    selectedMode,
    selectedOption,
    expandedPanel,
    isPreviewMode,
    availableModes,
  } = useAppSelector((state) => state.controlPanel);
  const controlList = [
    {
      label: "Start",
      action: () => {
        if (true) {
        } else {
        }
      },
      icon: Power,
      hasOptions: false,
    },
    {
      label: "Bake",
      action: () => {
        dispatch(setSelectedMode("Bake"));
        dispatch(setExpandedPanel(expandedPanel === "Bake" ? null : "Bake"));
        if (selectedOption) {
          dispatch(applyModeConfig({ mode: "Bake", option: selectedOption }));
        }
      },
      icon: Blend,
      hasOptions: true,
      options: availableModes.Bake || [],
    },
    {
      label: "Broil",
      action: () => {
        dispatch(setSelectedMode("Broil"));
        dispatch(setExpandedPanel(expandedPanel === "Broil" ? null : "Broil"));
        if (selectedOption) {
          dispatch(applyModeConfig({ mode: "Broil", option: selectedOption }));
        }
      },
      icon: Flame,
      hasOptions: true,
      options: availableModes.Broil || [],
    },
    {
      label: "Recipe",
      action: () => {
        dispatch(setSelectedMode("Recipe"));
        dispatch(
          setExpandedPanel(expandedPanel === "Recipe" ? null : "Recipe")
        );
        if (selectedOption) {
          dispatch(applyModeConfig({ mode: "Recipe", option: selectedOption }));
        }
      },
      icon: Zap,
      hasOptions: true,
      options: availableModes.Recipe || [],
    },
    {
      label: "Preview",
      action: () => {
        dispatch(togglePreviewMode());
      },
      icon: Eye,
      hasOptions: false,
    },
  ];

  return (
    <div className="  w-full h-full select-none flex  items-center    justify-center gap-12 relative">
      <div
        style={{
          padding: 10,
          display: "flex",
          alignItems: "center",
          transition: "all 0.4s ease",
        }}
        className="flex flex-row"
      >
        {/* Main control buttons */}
        <div className="flex flex-row  gap-10">
          {controlList.map((control) => (
            <div
              key={control.label}
              onClick={control.action}
              style={{
                position: "relative",
                zIndex: 10,
                borderRadius: "8px",
                border:
                  control.label === "Preview" && isPreviewMode
                    ? "2px solid rgba(34, 197, 94, 0.8)"
                    : "2px solid transparent",
                backgroundColor:
                  control.label === "Preview" && isPreviewMode
                    ? "rgba(34, 197, 94, 0.1)"
                    : "transparent",
                boxShadow:
                  control.label === "Preview" && isPreviewMode
                    ? "0 0 15px rgba(34, 197, 94, 0.3)"
                    : "none",
                transition: "all 0.3s ease",
                padding: "10px 20px",
              }}
              className="flex hover:bg-white/10 hover:border-white/20 active:bg-blue-400/30 active:border-blue-500/60 active:shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-95 duration-200 gap-3 cursor-pointer transition-all flex-row items-center justify-center"
            >
              <control.icon size={20} />
              {expandedPanel !== control.label ? (
                <span className=" text-sm font-semibold">
                  {control.label === "Start" ? "On" : control.label}
                </span>
              ) : null}
              {control.hasOptions && (
                // if has options, then render this div but width 0 px width as its not active yet
                // when clicked, it will expand to show options
                <div
                  className=" transition-all duration-300 ease-in-out items-center overflow-hidden flex flex-row"
                  style={{
                    width:
                      expandedPanel === control.label && control.options
                        ? control.options?.length * 78
                        : 0,
                    height: 50,
                  }}
                >
                  {control.options?.map((option) => (
                    <div
                      key={option}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Selected ${option}`);
                        setSelectedOption(option);
                        dispatch(setSelectedOption(option));
                        if (selectedMode) {
                          dispatch(
                            applyModeConfig({ mode: selectedMode, option })
                          );
                        }
                      }}
                      style={{
                        width: 70,
                        height: 40,
                        borderRadius: "6px",
                        border:
                          selectedOption === option
                            ? "2px solid rgba(34, 197, 94, 0.8)" // Green border when selected
                            : "1px solid rgba(255, 255, 255, 0.2)",
                        backgroundColor:
                          selectedOption === option
                            ? "rgba(34, 197, 94, 0.1)" // Light green background when selected
                            : "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(8px)",
                        margin: "0 4px",
                        transition: "all 0.2s ease",
                        boxShadow:
                          selectedOption === option
                            ? "0 0 15px rgba(34, 197, 94, 0.3)" // Green glow when selected
                            : "none",
                      }}
                      className="text-xs flex justify-center items-center cursor-pointer hover:bg-white/15 hover:border-white/30 hover:shadow-lg active:scale-95 active:bg-blue-400/20 select-none"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Click outside to hide options */}
      {expandedPanel && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 5,
            backgroundColor: "transparent",
          }}
          onClick={() => dispatch(setExpandedPanel(null))}
        />
      )}
    </div>
  );
}

export default ControlPanel;
