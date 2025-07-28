import React from "react";

interface DoorLockBtnProps {
  isOvenRunning: boolean;
  setIsOvenRunning: (running: boolean) => void;
  ifOvenPreview?: boolean; // Optional prop to handle oven preview state
}

function DoorLockBtn({
  isOvenRunning,
  setIsOvenRunning,
  ifOvenPreview,
}: DoorLockBtnProps) {
  return (
    <div>
      {isOvenRunning ? (
        // Locked state - red halo
        <div
          className=" flex flex-row items-center gap-2 select-none cursor-pointer"
          onClick={() => setIsOvenRunning(false)}
          style={{
            backdropFilter: ifOvenPreview ? "none" : "blur(12px)",
            padding: ifOvenPreview ? "5px 10px" : "10px 20px",
            backgroundColor: ifOvenPreview
              ? "transparent"
              : "rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            boxShadow: ifOvenPreview
              ? "none"
              : "0 0 20px rgba(255, 0, 0, 0.6), 0 0 40px rgba(255, 0, 0, 0.4), 0 0 60px rgba(255, 0, 0, 0.2)",
            animation: ifOvenPreview
              ? "none"
              : "dangerPulse 1.5s ease-in-out infinite",
            fontSize: ifOvenPreview ? "12px" : "14px",
            color: ifOvenPreview
              ? "rgba(255, 255, 255, 0.7)"
              : "rgba(255, 255, 255, 1)",
          }}
        >
          <div
            style={{
              width: ifOvenPreview ? 8 : 10,
              height: ifOvenPreview ? 8 : 10,
              backgroundColor: "red",
              borderRadius: "50%",
              boxShadow: ifOvenPreview
                ? "0 0 15px rgba(255, 0, 0, 0.8), 0 0 25px rgba(255, 0, 0, 0.6)"
                : "none",
              animation: ifOvenPreview
                ? "dangerPulse 1.5s ease-in-out infinite"
                : "none",
            }}
          />
          Locked
        </div>
      ) : (
        // Unlocked state - green halo
        <div
          className=" flex flex-row items-center gap-2 select-none cursor-pointer"
          onClick={() => setIsOvenRunning(true)}
          style={{
            backdropFilter: ifOvenPreview ? "none" : "blur(12px)",
            padding: ifOvenPreview ? "5px 10px" : "10px 20px",
            backgroundColor: ifOvenPreview
              ? "transparent"
              : "rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            boxShadow: ifOvenPreview
              ? "none"
              : "0 0 20px rgba(0, 255, 0, 0.6), 0 0 40px rgba(0, 255, 0, 0.4), 0 0 60px rgba(0, 255, 0, 0.2)",
            animation: ifOvenPreview
              ? "none"
              : "safePulse 2s ease-in-out infinite",
            fontSize: ifOvenPreview ? "12px" : "14px",
            color: ifOvenPreview
              ? "rgba(255, 255, 255, 0.7)"
              : "rgba(255, 255, 255, 1)",
          }}
        >
          <div
            style={{
              width: ifOvenPreview ? 8 : 10,
              height: ifOvenPreview ? 8 : 10,
              backgroundColor: "green",
              borderRadius: "50%",
              boxShadow: ifOvenPreview
                ? "0 0 15px rgba(0, 255, 0, 0.8), 0 0 25px rgba(0, 255, 0, 0.6)"
                : "none",
              animation: ifOvenPreview
                ? "safePulse 2s ease-in-out infinite"
                : "none",
            }}
          />
          Unlocked
        </div>
      )}

      <style>{`
            @keyframes dangerPulse {
              0% {
                box-shadow: 0 0 20px rgba(255, 0, 0, 0.6), 0 0 40px rgba(255, 0, 0, 0.4), 0 0 60px rgba(255, 0, 0, 0.2);
              }
              50% {
                box-shadow: 0 0 30px rgba(255, 0, 0, 0.8), 0 0 60px rgba(255, 0, 0, 0.6), 0 0 90px rgba(255, 0, 0, 0.4);
              }
              100% {
                box-shadow: 0 0 20px rgba(255, 0, 0, 0.6), 0 0 40px rgba(255, 0, 0, 0.4), 0 0 60px rgba(255, 0, 0, 0.2);
              }
            }
            
            @keyframes safePulse {
              0% {
                box-shadow: 0 0 20px rgba(0, 255, 0, 0.6), 0 0 40px rgba(0, 255, 0, 0.4), 0 0 60px rgba(0, 255, 0, 0.2);
              }
              50% {
                box-shadow: 0 0 25px rgba(0, 255, 0, 0.7), 0 0 50px rgba(0, 255, 0, 0.5), 0 0 75px rgba(0, 255, 0, 0.3);
              }
              100% {
                box-shadow: 0 0 20px rgba(0, 255, 0, 0.6), 0 0 40px rgba(0, 255, 0, 0.4), 0 0 60px rgba(0, 255, 0, 0.2);
              }
            }
          `}</style>
    </div>
  );
}

export default DoorLockBtn;
