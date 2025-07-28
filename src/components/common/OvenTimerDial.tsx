import { useState, useEffect, useRef } from "react";
import { Minus, Plus, Clock } from "lucide-react";
import { COLORS } from "../../constants";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

interface OvenTimerDialProps {
  size?: number;
  direction?: "left" | "right";
}

function OvenTimerDial({
  size = 200,
  direction = "right",
}: OvenTimerDialProps) {
  const dispatch = useAppDispatch();

  // Redux state
  const { timerMs } = useAppSelector((state) => state.oven);

  const [targetAngle, setTargetAngle] = useState(0);
  const [currentAngle, setCurrentAngle] = useState(0);
  const animationRef = useRef<number | null>(null);

  // Convert timer milliseconds to angle (0° to 180°)
  const msToAngle = (ms: number) => {
    const maxMs = 6 * 60 * 60 * 1000; // 6 hours max
    const minMs = 60 * 1000; // 1 minute min
    const percentage = Math.min(Math.max((ms - minMs) / (maxMs - minMs), 0), 1);
    return percentage * 180;
  };

  // Format time display
  const formatTime = (ms: number) => {
    const totalMinutes = Math.ceil(ms / (60 * 1000));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Update target angle when timer changes
  useEffect(() => {
    setTargetAngle(msToAngle(timerMs));
  }, [timerMs]);

  // Smooth animation effect
  useEffect(() => {
    if (Math.abs(currentAngle - targetAngle) < 0.1) return;

    const startTime = Date.now();
    const startAngle = currentAngle;
    const difference = targetAngle - startAngle;
    const duration = 150;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function
      const easeInOut =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const newAngle = startAngle + difference * easeInOut;
      setCurrentAngle(newAngle);

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
  }, [targetAngle, currentAngle]);

  // Timer increment/decrement handlers
  const handleIncrement = () => {
    dispatch(incrementTimer(5 * 60 * 1000)); // 5 minutes
  };

  const handleDecrement = () => {
    dispatch(decrementTimer(5 * 60 * 1000)); // 5 minutes
  };

  // Timer color segments (similar to temperature dial)
  const timerColors = [
    { start: 0, end: 60, color: "rgba(99, 102, 241, 0.5)" }, // Blue for short times
    { start: 60, end: 120, color: "rgba(16, 185, 129, 0.5)" }, // Green for medium times
    { start: 120, end: 180, color: "rgba(249, 115, 22, 0.5)" }, // Orange for long times
  ];

  // Create gradient stops based on current angle
  let gradientStops = [];

  for (const segment of timerColors) {
    if (currentAngle > segment.start) {
      gradientStops.push(`${segment.color} ${segment.start}deg`);
      gradientStops.push(
        `${segment.color} ${Math.min(currentAngle, segment.end)}deg`
      );
    }
  }

  if (currentAngle < 180) {
    gradientStops.push(`transparent ${currentAngle}deg`);
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
        {/* Center content - timer display and controls */}
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
          <Clock size={size / 10} color="white" className="mb-2" />

          <span
            style={{
              fontSize: size / 6,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            {formatTime(timerMs)}
          </span>

          {/* Timer controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDecrement}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200"
              style={{ fontSize: size / 20 }}
            >
              <Minus size={size / 20} color="white" />
            </button>

            <button
              onClick={handleIncrement}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200"
              style={{ fontSize: size / 20 }}
            >
              <Plus size={size / 20} color="white" />
            </button>
          </div>
        </div>

        {/* Halo effect with gradient color along the arc */}
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

        {/* Dial arc background */}
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
        />

        {/* Tick marks around the dial border */}
        <svg
          width={size + 100}
          height={size + 100}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: direction === "right" ? "rotateY(180deg)" : "none",
          }}
        >
          {Array.from({ length: 19 }, (_, i) => {
            const angle = i * 10; // 0° to 180° in 10° increments
            const isMainTick = i % 3 === 0; // Every 30° is a main tick
            const radius = (size + 50) / 2;
            const tickLength = isMainTick ? 15 : 8;
            const innerRadius = radius - tickLength;

            const x1 =
              (size + 100) / 2 +
              innerRadius * Math.cos((angle - 90) * (Math.PI / 180));
            const y1 =
              (size + 100) / 2 +
              innerRadius * Math.sin((angle - 90) * (Math.PI / 180));
            const x2 =
              (size + 100) / 2 +
              radius * Math.cos((angle - 90) * (Math.PI / 180));
            const y2 =
              (size + 100) / 2 +
              radius * Math.sin((angle - 90) * (Math.PI / 180));

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={
                  angle <= currentAngle ? "white" : "rgba(255,255,255,0.3)"
                }
                strokeWidth={isMainTick ? 3 : 1.5}
                opacity={angle <= currentAngle ? 1 : 0.5}
              />
            );
          })}
        </svg>

        {/* Progress indicator line */}
        <svg
          width={size + 100}
          height={size + 100}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: direction === "right" ? "rotateY(180deg)" : "none",
          }}
        >
          <line
            x1={(size + 100) / 2}
            y1={(size + 100) / 2}
            x2={
              (size + 100) / 2 +
              ((size + 50) / 2 - 10) *
                Math.cos((currentAngle - 90) * (Math.PI / 180))
            }
            y2={
              (size + 100) / 2 +
              ((size + 50) / 2 - 10) *
                Math.sin((currentAngle - 90) * (Math.PI / 180))
            }
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
            style={{
              filter: "drop-shadow(0 0 5px rgba(255,255,255,0.8))",
            }}
          />
        </svg>
      </div>
    </div>
  );
}

export default OvenTimerDial;
