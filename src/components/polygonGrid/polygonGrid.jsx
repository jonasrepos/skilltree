import styles from "./polygonGrid.module.css";
import React, { useState } from "react";

const PolygonGrid = () => {
  const [hexes, setHexes] = useState([
    { id: 1, x: 100, y: 100 },
    { id: 2, x: 300, y: 300 },
    { id: 3, x: 300, y: 300 },
    { id: 4, x: 300, y: 300 },
    { id: 5, x: 300, y: 300 },
    { id: 6, x: 300, y: 300 },
    { id: 7, x: 300, y: 300 },
    { id: 8, x: 300, y: 300 },
    { id: 9, x: 300, y: 300 },
  ]);
  const [draggingHex, setDraggingHex] = useState(null);

  const HEX_SIZE = 100; // Breite und Höhe des Sechsecks (muss mit CSS übereinstimmen)
  const SNAP_DISTANCE = 50; // Abstand für "Schnappen"

  const startDrag = (id) => {
    setDraggingHex(id);
  };

  const onDrag = (e) => {
    if (draggingHex !== null) {
      const x = e.clientX - HEX_SIZE / 2;
      const y = e.clientY - HEX_SIZE / 2;

      setHexes((otherHexes) =>
        otherHexes.map((hex) =>
          hex.id === draggingHex ? { ...hex, x, y } : hex
        )
      );

      snapToNeighbor(x, y);
    }
  };

  const stopDrag = () => {
    setDraggingHex(null);
  };

  const snapToNeighbor = (dragX, dragY) => {
    const neighbors = hexes.filter((hex) => hex.id !== draggingHex);

    for (const neighbor of neighbors) {
      const possiblePositions = [
        {
          x: neighbor.x + HEX_SIZE,
          y: neighbor.y,
        },
        {
          x: neighbor.x - HEX_SIZE,
          y: neighbor.y,
        },
        {
          x: neighbor.x + HEX_SIZE * 0.5,
          y: neighbor.y - HEX_SIZE * 0.75,
        },
        {
          x: neighbor.x - HEX_SIZE * 0.5,
          y: neighbor.y - HEX_SIZE * 0.75,
        },
        {
          x: neighbor.x + HEX_SIZE * 0.5,
          y: neighbor.y + HEX_SIZE * 0.75,
        },
        {
          x: neighbor.x - HEX_SIZE * 0.5,
          y: neighbor.y + HEX_SIZE * 0.75,
        },
      ];

      // Check if the dragged hexagon is close enough to snap to a position
      for (const pos of possiblePositions) {
        if (
          Math.abs(dragX - pos.x) < SNAP_DISTANCE &&
          Math.abs(dragY - pos.y) < SNAP_DISTANCE
        ) {
          setHexes((prevHexes) =>
            prevHexes.map((hex) =>
              hex.id === draggingHex ? { ...hex, x: pos.x, y: pos.y } : hex
            )
          );
          return;
        }
      }
    }
  };

  return (
    <div
      className={styles.container}
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      {hexes.map((hex) => (
        <div
          key={hex.id}
          id={`hex-${hex.id}`}
          className={styles.hexagon}
          style={{ left: `${hex.x}px`, top: `${hex.y}px` }}
          onMouseDown={() => startDrag(hex.id)}
        ></div>
      ))}
    </div>
  );
};

export default PolygonGrid;
