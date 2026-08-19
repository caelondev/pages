import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./LinkInfo.module.css";

interface LinkInfoProps {
  to: string;
  name: string;
  desc?: string;
  index: number;
  note?: string;
}

export function LinkInfo({ to, name, desc, note, index }: LinkInfoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isExternal = to.startsWith("http") || to.startsWith("mailto");

  useEffect(() => {
    if (ref.current) {
      ref.current.style.animation = `slideUp 0.6s ease-out ${index * 0.1}s both`;
    }
  }, [index]);

  return (
    <div ref={ref} className={styles.linkInfo}>
      {note != null && <span className={styles.note}>{note}</span>}
      <div className={styles.row}>
        <span>
          <span className={styles.hashtag}>#</span>
          {isExternal ? (
            <a
              href={to}
              className={styles.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{name}</span>
            </a>
          ) : (
            <Link to={to} className={styles.name}>
              <span>{name}</span>
            </Link>
          )}
        </span>
        <span className={styles.link}>{desc != null ? desc : to}</span>
      </div>
    </div>
  );
}
