import styles from "./polygonGrid.module.css";
import React, { useEffect, useState } from "react";

import useSound from "use-sound";
import qala from "/freak.mp3";

const PolygonGrid = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { pause, duration, sound }] = useSound(qala);

  const [currTime, setCurrTime] = useState({
    min: "",
    sec: "",
  }); // current position of the audio in minutes and seconds

  const [seconds, setSeconds] = useState(); // current position of the audio in s

  useEffect(() => {
    const sec = duration / 1000;
    const min = Math.floor(sec / 60);
    const secRemain = Math.floor(sec % 60);
    const time = {
      min: min,
      sec: secRemain,
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([])); // setting the seconds state with the current state
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min,
          sec,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  const playingButton = () => {
    if (isPlaying) {
      pause(); // this will pause the audio
      setIsPlaying(false);
    } else {
      play(); // this will play the audio
      setIsPlaying(true);
    }
  };

  const [hexes, setHexes] = useState([
    { id: 1, x: 100, y: 100 },
    { id: 2, x: 200, y: 100 },
    { id: 3, x: 300, y: 100 },
    { id: 4, x: 400, y: 100 },
    { id: 5, x: 500, y: 100 },
    { id: 6, x: 600, y: 100 },
    { id: 7, x: 700, y: 100 },
    { id: 8, x: 100, y: 200 },
    { id: 9, x: 200, y: 200 },
    { id: 10, x: 300, y: 200 },
    { id: 11, x: 400, y: 200 },
    { id: 12, x: 500, y: 200 },
    { id: 13, x: 600, y: 200 },
    { id: 14, x: 700, y: 200 },
    { id: 15, x: 100, y: 300 },
    { id: 16, x: 200, y: 300 },
    { id: 17, x: 300, y: 300 },
    { id: 18, x: 400, y: 300 },
    { id: 19, x: 500, y: 300 },
    { id: 20, x: 600, y: 300 },
    { id: 21, x: 700, y: 300 },
    { id: 22, x: 100, y: 400 },
    { id: 23, x: 200, y: 400 },
    { id: 24, x: 300, y: 400 },
    { id: 25, x: 400, y: 400 },
    { id: 26, x: 500, y: 400 },
    { id: 27, x: 600, y: 400 },
    { id: 28, x: 700, y: 400 },
    { id: 29, x: 100, y: 500 },
    { id: 30, x: 200, y: 500 },
    { id: 31, x: 300, y: 500 },
    { id: 32, x: 400, y: 500 },
    { id: 33, x: 500, y: 500 },
    { id: 34, x: 600, y: 500 },
    { id: 35, x: 700, y: 500 },
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
    <>
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
          >
            {hex.id}
          </div>
        ))}
      </div>
      <div className={styles.component}>
        <p className={styles.nowPlaying}>Now Playing</p>
        <img className={styles.musicCover} src="/freak.png" />
        <div>
          <p className={styles.title}>Freak on 8 bit</p>
          <p className={styles.subTitle}>Korn</p>
        </div>
        <div>
          <div className={styles.time}>
            <p>
              {currTime.min}:{currTime.sec}
            </p>
            <p>
              {currTime.min}:{currTime.sec}
            </p>
          </div>
        </div>
        <input
          type="range"
          min="0"
          max={duration / 1000}
          default="0"
          value={seconds}
          className="timeline"
          onChange={(e) => {
            sound.seek([e.target.value]);
          }}
        />
        <div className={styles.playBtnContainer}>
          <button className={styles.playButton}>
            {" "}
            <img
              className={styles.playButtonIcon}
              src="/SkipBackCircle.svg"
              alt=""
            />
          </button>
          {!isPlaying ? (
            <button className={styles.playButton} onClick={playingButton}>
              <img
                className={styles.playButtonIcon}
                src="/PlayCircle.svg"
                alt=""
              />
            </button>
          ) : (
            <button className={styles.playButton} onClick={playingButton}>
              <img
                className={styles.playButtonIcon}
                src="/PauseCircle.svg"
                alt=""
              />
            </button>
          )}
          <button className={styles.playButton}>
            {" "}
            <img
              className={styles.playButtonIcon}
              src="/SkipForwardCircle.svg"
              alt=""
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default PolygonGrid;
