import styles from "./Webring.module.css";

interface WebringProps {
  prev: string;
  next: string;
}

export function Webring({ prev, next }: WebringProps) {
  return (
    <>
      <div className={styles.parent}>
        <button
          className={`${styles.button} ${styles.side_button}`}
          onClick={() => {
            location.href = prev;
          }}
        >
          &lsaquo;
        </button>
        <button
          className={styles.button}
          onClick={() => {
            location.href = "https://ring.stabbed.me";
          }}
        >
          caelondev
        </button>
        <button
          className={`${styles.button} ${styles.side_button}`}
          onClick={() => {
            location.href = next;
          }}
        >
          &rsaquo;
        </button>
      </div>
    </>
  );
}
