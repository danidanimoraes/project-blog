"use client";

import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

import { motion } from "framer-motion";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [intervalId, setIntervalId] = React.useState();
  const id = React.useId();

  const handlePlay = () => {
    const intervalId = window.setInterval(() => handleIncreaseTime(), 1000);
    setIntervalId(intervalId);
  };

  const handlePause = () => {
    window.clearInterval(intervalId);
    setIntervalId(null);
  };

  const selectedColor = COLORS[timeElapsed % COLORS.length];

  const handleIncreaseTime = () => {
    setTimeElapsed((t) => t + 1);
  };

  const handleResetTime = () => {
    setTimeElapsed(0);

    window.clearInterval(intervalId);
    setIntervalId(null);
  };

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId={`${id}-outline`}
                  className={styles.selectedColorOutline}
                  style={{ zIndex: 3 }}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={intervalId ? handlePause : handlePlay}>
            {intervalId ? <Pause /> : <Play />}
            <VisuallyHidden>{intervalId ? "Pause" : "Play"}</VisuallyHidden>
          </button>
          <button onClick={handleResetTime}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
