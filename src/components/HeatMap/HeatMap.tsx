import styles from "./HeatMap.module.css";

interface HeatMapProps {
  title?: string;
  from: string;
}

export function HeatMap({ from, title }: HeatMapProps) {
  return (
    <>
      <p>{title ? title : ""}</p>
      <div className={styles.heatMap}>
        <img src={from} />
      </div>
    </>
  );
}
