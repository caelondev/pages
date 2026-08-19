import { useRef } from "react";
import styles from "./Webring.module.css";

interface WebringProps {
  name: string;
  link?: string;
  prev: string;
  next: string;
}

export function Webring({ name, prev, next, link }: WebringProps) {
  const ref = useRef<HTMLDivElement>(null);

  let nameTag =
    link != null ? (
      <a href={link} className={`${styles.a} ${styles.name}`}>
        {name}
      </a>
    ) : (
      name
    );

  return (
    <div className={styles.webring} ref={ref}>
      <a href={prev} className={styles.a}>
        <span className={styles.arrow}>{"<---"}</span>
      </a>
      <span className={styles.name}>{nameTag}</span>
      <a href={next} className={styles.a}>
        <span className={styles.arrow}>{"--->"}</span>
      </a>
    </div>
  );
}
