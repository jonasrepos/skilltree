import styles from "./polygonGrid.module.css";

const data = [...Array(100)];

// Hilfsfunktion zum Aufteilen der Daten in Reihen
const generateGrid = (data) => {
  let result = [];
  let groupSize = 4; // Anfangsgröße 4 für die erste Reihe

  for (let i = 0; i < data.length; i += groupSize) {
    result.push(data.slice(i, i + groupSize));

    // Wechsel die Gruppengröße für die nächste Reihe (4 <-> 5)
    groupSize = groupSize === 4 ? 5 : 4;
  }

  return result;
};

const PolygonGrid = () => {
  const rows = generateGrid(data, 10);

  return (
    <div id={styles.polygonGrid}>
      {rows.map((row, index) => (
        <div key={index} id={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
          {row.map((item, subIndex) => (
            <div key={subIndex} id={styles.polygon}>
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PolygonGrid;
