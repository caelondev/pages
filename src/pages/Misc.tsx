import { HeatMap } from "../components/HeatMap/HeatMap";
import { MusicInfo } from "../components/MusicInfo/MusicInfo";
import styles from "./Misc.module.css";

export function Misc() {
  return (
    <>
      <h1 className={styles.header}>More random infos</h1>

      <MusicInfo />
      <hr />
      <HeatMap
        title="codeberg heatmap :3"
        from={
          "https://codeberg-activity-graph.vercel.app/activity?user=caelondev&theme=codeberg"
        }
      />
    </>
  );
}
