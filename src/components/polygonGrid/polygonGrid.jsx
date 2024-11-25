import styles from "./polygonGrid.module.css";
import React, { useState, useEffect } from "react";

const PolygonGrid = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [keysPressed, setKeysPressed] = useState({});

  const handleKeyDown = (e) => {
    setKeysPressed((prev) => ({ ...prev, [e.key]: true }));
  };

  const handleKeyUp = (e) => {
    setKeysPressed((prev) => ({ ...prev, [e.key]: false }));
  };

  useEffect(() => {
    const move = () => {
      const step = 100;
      setPosition((prev) => {
        let { x, y } = prev;

        if (keysPressed["w"]) y = Math.max(y - step, 0); // Up
        if (keysPressed["s"]) y = Math.min(y + step, window.innerHeight - 30); // Down
        if (keysPressed["a"]) x = Math.max(x - step, 0); // Left
        if (keysPressed["d"]) x = Math.min(x + step, window.innerWidth - 30); // Right

        return { x, y };
      });
    };

    const interval = setInterval(move, 50); // Move at a fixed interval
    return () => clearInterval(interval);
  }, [keysPressed]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset]);

  return (
    <div
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        width: 30,
        height: 30,
        backgroundColor: "blue",
        cursor: "grab",
      }}
      onMouseDown={handleMouseDown}
    />
  );
};

export default PolygonGrid;
