import { Fan } from "lucide-react";
import { useAppSelector } from "../../store/hooks";

function OvenFan({ isActive }: { isActive: boolean }) {
  return (
    <div
      style={{
        width: 120,
        height: 120,
      }}
      className="  flex justify-center items-center relative"
    >
      {/* Background circle - always rendered but different styles based on isActive */}
      <div
        style={{
          width: 100,
          height: 100,
          borderWidth: 2,
          backgroundColor: isActive ? "rgba(139, 90, 43, 0.3)" : "transparent",
          boxShadow: isActive
            ? "0 0 30px rgba(251, 191, 36, 0.4), 0 0 50px rgba(251, 191, 36, 0.2)"
            : "none",
          animation: isActive
            ? "fanBackground 1.6s ease-in-out infinite"
            : "none",
        }}
        className="absolute border border-white opacity-10 rounded-full"
      />

      {/* Fan icon with rotation when active */}
      <div
        style={{
          animation: isActive ? "fanRotate 0.5s linear infinite" : "none",
        }}
      >
        <Fan color={isActive ? "#fbbf24" : "#374151"} size={60} />
      </div>

      <style>{`
        @keyframes fanRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes fanBackground {
          0% {
            transform: scale(0.8);
            opacity: 0.3;
          }
          30% {
            transform: scale(1.2);
            opacity: 0.1;
          }
          50% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}

function OvenPanel({ isActive }: { isActive: boolean }) {
  return (
    <div
      style={{
        position: "relative",
        width: "98%",
        height: 16,
      }}
      className="flex items-center justify-center"
    >
      {/* Main panel */}
      <div
        style={{
          height: 16,
          backgroundColor: isActive ? "#8b5a2b" : "#374151",
          boxShadow: isActive
            ? "0 0 20px rgba(251, 191, 36, 0.6), 0 0 40px rgba(251, 191, 36, 0.4)"
            : "none",
          animation: isActive ? "heatingPulse 2s ease-in-out infinite" : "none",
        }}
        className="w-full flex items-center justify-around rounded-2xl"
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            style={{
              width: isActive ? 8 : 6,
              height: isActive ? 8 : 6,
              backgroundColor: isActive ? "#fbbf24" : "#4c5664",
              margin: "0 1px",
              borderRadius: "50%",
              boxShadow: isActive ? "0 0 10px rgba(251, 191, 36, 0.8)" : "none",
              animation: isActive
                ? "dotGlow 1.5s ease-in-out infinite alternate"
                : "none",
            }}
          />
        ))}
      </div>

      {/* Pale overlay for scaling effect */}
      {isActive && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: 16,
            backgroundColor: "#fff",
            opacity: 0.2,
            borderRadius: "1rem",
            animation: "scaleOverlay 1.6s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
      )}

      <style>{`
        @keyframes heatingPulse {
          0% {
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.6), 0 0 40px rgba(251, 191, 36, 0.4);
            background-color: #8b5a2b;
          }
          50% {
            box-shadow: 0 0 30px rgba(251, 191, 36, 0.8), 0 0 60px rgba(251, 191, 36, 0.6), 0 0 80px rgba(239, 68, 68, 0.4);
            background-color: #a0522d;
          }
          100% {
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.6), 0 0 40px rgba(251, 191, 36, 0.4);
            background-color: #8b5a2b;
          }
        }
        
        @keyframes dotGlow {
          0% {
            box-shadow: 0 0 10px rgba(251, 191, 36, 0.8);
            background-color: #fbbf24;
          }
          100% {
            box-shadow: 0 0 15px rgba(251, 191, 36, 1), 0 0 25px rgba(239, 68, 68, 0.6);
            background-color: #f59e0b;
          }
        }
        
        @keyframes scaleOverlay {
          0% {
            transform: translate(-50%, -50%) scaleX(0.93);
            opacity: 0.2;
          }
          30% {
            transform: translate(-50%, -50%) scaleX(1.4) scaleY(1.1);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scaleX(0.93);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, -50%) scaleX(0.93);
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}

function OvenPreview() {
  const { elements } = useAppSelector((state) => state.preview);

  // Use preview state from Redux
  const config = {
    top: elements.topElement || elements.broilerElement,
    fan: elements.convectionFan,
    bottom: elements.bottomElement,
  };

  return (
    <div
      style={{
        animation: "fadeIn 0.8s ease-out forwards",
        padding: "50px 30px",
      }}
      className="  w-full h-full flex flex-row justify-center "
    >
      <style>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div
        style={{
          padding: 10,
          width: 500,
        }}
        className="h-full "
      >
        {/* Oven Simulator */}
        <div
          style={{
            padding: 28,
            backgroundColor: "#4a556520",
          }}
          className=" w-full relative h-full flex items-center justify-center   border-4  rounded-md border-gray-600"
        >
          {/* Oven Core  */}
          <div
            style={{
              backgroundColor: "#190e10",
              padding: 12,
            }}
            className=" border-1 border-gray-500 rounded-sm  w-full   h-full"
          >
            <div
              style={{
                borderColor: "#432f2a",
                padding: 6,
              }}
              className=" h-full w-full border  rounded-sm"
            >
              <div
                style={{
                  borderColor: "#432f2a",
                }}
                className=" h-full w-full border   items-center rounded-sm flex flex-col justify-between"
              >
                {/* Oven top  */}
                <OvenPanel isActive={config.top} />
                {/* Fan  */}
                <OvenFan isActive={config.fan} />
                {/* Oven bottom  */}
                <OvenPanel isActive={config.bottom} />
              </div>
            </div>
          </div>

          {/* Oven bottom  */}
          <div
            style={{
              width: " 30%",
              height: 20,
              left: "50%",
              transform: "translateX(-50%)",
              background: "linear-gradient(to bottom, #777, #4b5563)",
            }}
            className=" absolute bottom-0 left-0 right-0 rounded-t-lg "
          />
        </div>
      </div>
    </div>
  );
}

export default OvenPreview;
