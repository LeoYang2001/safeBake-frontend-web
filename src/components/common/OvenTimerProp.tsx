import { useState, useEffect, useRef } from "react";
import { COLORS } from "../../constants";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

interface OvenTimerPropProps {
  size?: number;
  direction?: "left" | "right";
}

function OvenTimerProp({
  size = 200,
  direction = "right",
}: OvenTimerPropProps) {
  // Only use estimatedPreheatTime from Redux
  const { estimatedPreheatTime } = useAppSelector((state) => state.oven);

  // Local state for countdown in ms
  const [remainingMs, setRemainingMs] = useState(estimatedPreheatTime * 1000);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start countdown timer on mount or when estimatedPreheatTime changes
  useEffect(() => {
    setRemainingMs(estimatedPreheatTime * 1000);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (estimatedPreheatTime > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingMs((prev) => {
          if (prev <= 1000) {
            clearInterval(intervalRef.current!);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [estimatedPreheatTime]);

  const animationRef = useRef<number | null>(null);

  // Calculate percentages for display
  const targetPercentage = Math.max(
    0,
    (remainingMs / (estimatedPreheatTime * 1000)) * 100
  );
  const [currentPercentage, setCurrentPercentage] = useState(targetPercentage);

  // Format time for display
  const formatTime = (ms: number) => {
    const totalSeconds = Math.ceil(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Smooth animation effect - matching OvenDialProp animation
  useEffect(() => {
    if (currentPercentage === targetPercentage) return;

    const startTime = Date.now();
    const startPercentage = currentPercentage;
    const difference = targetPercentage - startPercentage;
    const duration = 100; // Same animation duration as OvenDialProp

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Same easing function as OvenDialProp
      const easeInOut =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const newPercentage = startPercentage + difference * easeInOut;
      setCurrentPercentage(newPercentage);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetPercentage, currentPercentage]);

  // Timer color palette - green to red theme (timer countdown colors)
  const timerColors = [
    { start: 0, end: 60, color: "rgba(239, 68, 68, 0.5)" }, // Red for critical time (0-60°)
    { start: 60, end: 120, color: "rgba(249, 115, 22, 0.5)" }, // Orange for warning (60-120°)
    { start: 120, end: 180, color: "rgba(16, 185, 129, 0.5)" }, // Green for plenty of time (120-180°)
  ];

  // Calculate the end angle for the progress (semicircle from 0° to 180°)
  const endAngle = (currentPercentage / 100) * 180; // 0° to 180° (top to bottom)

  // Create gradient stops based on current percentage - matching OvenDialProp logic
  let gradientStops = [];

  // Show segments from 0° to endAngle
  for (const segment of timerColors) {
    if (endAngle > segment.start) {
      gradientStops.push(`${segment.color} ${segment.start}deg`);
      gradientStops.push(
        `${segment.color} ${Math.min(endAngle, segment.end)}deg`
      );
    }
  }
  // Add transparent after the end angle
  if (endAngle < 180) {
    gradientStops.push(`transparent ${endAngle}deg`);
  }
  gradientStops.push(`transparent 180deg`);
  gradientStops.push(`transparent 360deg`);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px",
        backgroundColor: "var(--color-background)",
        borderRadius: "20px",
      }}
      className="select-none"
    >
      <div
        className="relative"
        style={{
          position: "relative",
          width: size + 100,
          height: size + 100,
        }}
      >
        {/* Center content - timer display */}
        <div
          className="absolute flex flex-col items-center justify-center"
          style={{
            left: "50%",
            top: "50%",
            transform: "translateX(-50%) translateY(-50%)",
            zIndex: 10,
            height: "60%",
          }}
        >
          {/* Timer Display */}
          <div className="flex flex-col items-center">
            <span
              style={{
                fontSize: size / 5 + 5,
                fontWeight: "bold",
                color: remainingMs === 0 ? "#ef4444" : "white",
                fontFamily: "monospace",
                textAlign: "center",
              }}
            >
              {formatTime(remainingMs)}
            </span>

            {remainingMs === 0 && (
              <div
                style={{
                  fontSize: size / 16,
                  color: "#ef4444",
                  marginTop: 5,
                  fontWeight: "600",
                  animation: "blink 1s infinite",
                }}
              >
                TIME'S UP!
              </div>
            )}
          </div>
        </div>

        {/* Halo effect with gradient color along the arc - matching OvenDialProp */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size + 100,
            height: size + 100,
            borderRadius: "50%",
            background: `conic-gradient(from 0deg at 50% 50%, ${gradientStops.join(
              ", "
            )})`,
            filter: "blur(15px)",
            transform: direction === "right" ? "rotateY(180deg)" : "none",
          }}
        />

        {/* Dial arc - matching OvenDialProp background */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) ${
              direction === "right" ? "rotateY(180deg)" : ""
            }`,
            width: size + 50,
            height: size + 50,
            borderRadius: "50%",
            opacity: 0.96,
            background: `linear-gradient(to right, 
             ${COLORS.BACKGROUND} 0%, 
             ${COLORS.BACKGROUND} 60%, 
              #333 100%)`,
          }}
        ></div>

        {/* Tick marks around the dial border - matching OvenDialProp SVG ticks */}
        <svg
          width={size + 100}
          height={size + 100}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            transform: direction === "right" ? "rotateY(180deg)" : "none",
          }}
        >
          {Array.from({ length: Math.round(currentPercentage) }, (_, i) => {
            // Calculate angle from 0° to 180° (top to bottom)
            const angle = (i / 99) * 180;

            const dialRadius = (size + 50) / 2;
            const centerX = (size + 100) / 2;
            const centerY = (size + 100) / 2;

            // Calculate tick color based on its position - timer colors
            const tickProgress = i / 99; // 0 to 1
            const tickIndex = i; // 0 to 99
            let tickColor;
            let tickOpacity;

            // Color segments: 0-60°, 60-120°, 120-180° - timer color scheme
            if (tickProgress <= 60 / 180) {
              tickColor = "#ef4444"; // Red for critical time
            } else if (tickProgress <= 120 / 180) {
              tickColor = "#f97316"; // Orange for warning
            } else {
              tickColor = "#10b981"; // Green for plenty of time
            }

            // Calculate opacity based on distance from transition points
            const transitionPoint1 = 33; // First transition point
            const transitionPoint2 = 67; // Second transition point
            const transitionRange = 8; // Range around transition points for low opacity

            // Distance from nearest transition point
            const distanceFrom33 = Math.abs(tickIndex - transitionPoint1);
            const distanceFrom67 = Math.abs(tickIndex - transitionPoint2);

            if (distanceFrom33 <= transitionRange) {
              // Near 33rd tick transition
              tickOpacity = 0.05 + 0.1 * distanceFrom33;
            } else if (distanceFrom67 <= transitionRange) {
              // Near 67th tick transition
              tickOpacity = 0.05 + 0.085 * distanceFrom67;
            } else {
              // Far from transitions, normal opacity
              tickOpacity = 0.8;
            }

            // Tick length and position
            const tickLength = 12;
            const innerRadius = dialRadius + 1; // Start from dial border
            const outerRadius = dialRadius + tickLength; // Extend outward

            // Calculate tick positions
            const x1 =
              centerX + innerRadius * Math.cos(((angle - 90) * Math.PI) / 180);
            const y1 =
              centerY + innerRadius * Math.sin(((angle - 90) * Math.PI) / 180);
            const x2 =
              centerX + outerRadius * Math.cos(((angle - 90) * Math.PI) / 180);
            const y2 =
              centerY + outerRadius * Math.sin(((angle - 90) * Math.PI) / 180);

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={tickColor}
                strokeWidth="2"
                opacity={tickOpacity}
              />
            );
          })}
        </svg>
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}

export default OvenTimerProp;
