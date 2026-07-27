import { Link } from "react-router-dom";
import styles from "./LinkInfo.module.css";

interface LinkInfoProps {
  to: string;
  name: string;
  index: number;
}

export function LinkInfo({ to, name }: LinkInfoProps) {
  const isExternal = to.startsWith("http") || to.startsWith("mailto");

  return (
    <div className={styles.linkInfo}>
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
      <span className={styles.link}>{to}</span>
    </div>
  );
}
