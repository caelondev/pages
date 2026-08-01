import styles from "./HeatMap.module.css";

interface HeatMapProps {
  title?: string;
  from: string;
}

export function HeatMap({ from, title }: HeatMapProps) {
  return (
    <div className={styles.wrapper}>
      {title && <p className={styles.label}>{title}</p>}
      <div className={styles.heatMap}>
        <img src={from} alt={title ?? "Heat map"} className={styles.image} />
      </div>
    </div>
  );
}
