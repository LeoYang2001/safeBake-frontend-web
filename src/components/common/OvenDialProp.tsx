import React, { useState, useEffect, useRef } from "react";
import { COLORS } from "../../constants";
import { ChevronDown, ChevronUp } from "lucide-react";

interface OvenDialPropProps {
  percentage?: number;
  currentValue?: number;
  label?: string;
  valueLabel?: string;
  size?: number;
  range?: [number, number];
  direction?: "left" | "right";
  setCurrentValue: React.Dispatch<React.SetStateAction<number>>;
}

function OvenDialProp({
  percentage: directPercentage,
  range = [0, 100],
  currentValue = 75,
  label = "Cool when it reaches",
  valueLabel = "°F",
  size = 200,
  direction = "left",
  setCurrentValue = () => {},
}: OvenDialPropProps) {
  // Calculate percentage from range and current value
  const calculatePercentage = (value: number, [min, max]: [number, number]) => {
    return Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
  };

  // Use direct percentage if provided, otherwise calculate from range
  const initialPercentage =
    directPercentage ?? calculatePercentage(currentValue, range);

  // State to control percentage for animation - start at 0 for initial animation
  const [targetPercentage, setTargetPercentage] = useState(initialPercentage);
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const animationRef = useRef<number | null>(null);

  // Update target percentage when currentValue or range changes
  useEffect(() => {
    const newPercentage =
      directPercentage ?? calculatePercentage(currentValue, range);
    setTargetPercentage(newPercentage);
  }, [currentValue, range, directPercentage]);

  // Smooth animation effect
  useEffect(() => {
    if (currentPercentage === targetPercentage) return;

    const startTime = Date.now();
    const startPercentage = currentPercentage;
    const difference = targetPercentage - startPercentage;
    const duration = 100; // 1 second animation

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
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

  // Calculate the end angle based on current animated percentage
  const endAngle = (currentPercentage / 100) * 180; // 0° to 180° (top to bottom)

  // Fixed color segments - 3 colors across 180°
  const segments = [
    { start: 0, end: 60, color: "rgba(190, 37, 63, 0.5)" }, // #be253f: 0-60°
    { start: 60, end: 120, color: "rgba(101, 30, 84, 0.5)" }, // #651e54: 60-120°
    { start: 120, end: 180, color: "rgba(46, 46, 106, 0.5)" }, // #2e2e6a: 120-180°
  ];

  // Create gradient stops based on current percentage
  let gradientStops = [];

  // Show segments from 0° to endAngle
  for (const segment of segments) {
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
      {/* Range and value display */}
      {/* <div
        style={{
          marginBottom: "20px",
          fontSize: "14px",
          color: "var(--color-text-secondary)",
          textAlign: "center",
        }}
      >
        Range: [{range[0]}, {range[1]}] | Current Value: {currentValue}
      </div> */}

      {/* Percentage display */}
      {/* <div
        style={{
          marginBottom: "20px",
          fontSize: "18px",
          fontWeight: "bold",
          color: "var(--color-text-primary)",
        }}
      >
        Progress: {Math.round(currentPercentage)}%
      </div> */}

      <div
        className="  relative"
        style={{
          position: "relative",
          width: size + 100,
          height: size + 100,
        }}
      >
        {/* Label & adjustment btns display */}
        <div
          className="absolute flex flex-col items-center    justify-between"
          style={{
            left: "50%",
            top: "50%",
            transform: "translateX(-50%) translateY(-50%)",
            zIndex: 10,
            height: " 60%",
          }}
        >
          {/* Increment button */}
          <div
            onClick={() => {
              const newValue = Math.min(currentValue + 1, range[1]);
              setCurrentValue(newValue);
            }}
            style={{ fontSize: "16px" }}
            className=" cursor-pointer hover:opacity-60 transition-opacity duration-200"
          >
            <ChevronUp size={48} color="rgba(190, 37, 63, 1)" />
          </div>

          {/* Current value and label */}
          <div className="flex flex-col items-center">
            <span
              style={{
                fontSize: size / 5 + 5,
              }}
              className=" font-semibold text-white  "
            >
              {valueLabel}
            </span>
            <span
              style={{
                fontSize: 14,
              }}
              className="   text-white opacity-60  text-nowrap "
            >
              {label}
            </span>
          </div>

          {/* Decrement button */}
          <div
            onClick={() => {
              const newValue = Math.max(currentValue - 1, range[0]);
              setCurrentValue(newValue);
            }}
            style={{ fontSize: "16px" }}
            className=" cursor-pointer hover:opacity-60 transition-opacity duration-200"
          >
            <ChevronDown size={48} color="rgba(46, 46, 106, 1)" />
          </div>
        </div>
        {/* Halo effect with gradient color along the arc (0° to endAngle) */}
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
        {/* Dial arc */}
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

        {/* Tick marks around the dial border */}
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

            // Calculate tick color based on its position
            const tickProgress = i / 99; // 0 to 1
            const tickIndex = i; // 0 to 99
            let tickColor;
            let tickOpacity;

            // Color segments: 0-60°, 60-120°, 120-180°
            if (tickProgress <= 60 / 180) {
              tickColor = "#be253f"; // Deep Red
            } else if (tickProgress <= 120 / 180) {
              tickColor = "#651e54"; // Purple
            } else {
              tickColor = "#2e2e6a"; // Dark Blue
            }

            // Calculate opacity based on distance from transition points (33rd and 67th ticks)
            const transitionPoint1 = 33; // First transition point
            const transitionPoint2 = 67; // Second transition point
            const transitionRange = 8; // Range around transition points for low opacity

            // Distance from nearest transition point
            const distanceFrom33 = Math.abs(tickIndex - transitionPoint1);
            const distanceFrom67 = Math.abs(tickIndex - transitionPoint2);

            if (distanceFrom33 <= transitionRange) {
              // Near 33rd tick transition
              tickOpacity = 0.05 + 0.1 * distanceFrom33; // Very low opacity near transition
            } else if (distanceFrom67 <= transitionRange) {
              // Near 67th tick transition
              tickOpacity = 0.05 + 0.085 * distanceFrom67; // Very low opacity near transition
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
    </div>
  );
}

export default OvenDialProp;
