import styles from "./Webring.module.css";

export function Webring() {
  return (
    <>
      <div className={styles.parent}>
        <button
          className={`${styles.button} ${styles.side_button}`}
          onClick={() => {
            location.href =
              "https://ring.stabbed.me/prev/from/" + location.hostname;
          }}
        >
          &lsaquo;
        </button>
        <button className={styles.button}>caelondev</button>
        <button
          className={`${styles.button} ${styles.side_button}`}
          onClick={() => {
            location.href =
              "https://ring.stabbed.me/next/from/" + location.hostname;
          }}
        >
          &rsaquo;
        </button>
      </div>
    </>
  );
}
