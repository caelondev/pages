import { HeatMap } from "../components/HeatMap/HeatMap";
import { JokeCard } from "../components/JokeCard/JokeCard";
import { MusicInfo } from "../components/MusicInfo/MusicInfo";
import styles from "./Misc.module.css";

export function Misc() {
  return (
    <div className={styles.misc}>
      <h1 className={styles.header}>Random things</h1>

      <MusicInfo />
      <p className={styles.aside}>yeah i know, i got a bad taste</p>

      <hr className={styles.dotted} />

      <HeatMap
        title="codeberg heatmap :3"
        from={
          "https://codeberg-activity-graph.vercel.app/activity?user=caelondev&theme=codeberg"
        }
      />

      <hr />

      <JokeCard />
    </div>
  );
}
