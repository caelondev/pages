import { Link } from "react-router-dom";
import styles from "./LinkInfo.module.css";

interface LinkInfoProps {
  to: string;
  name: string;
}

export function LinkInfo({ to, name }: LinkInfoProps) {
  const isExternal = to.startsWith("http") || to.startsWith("mailto:");

  return isExternal ? (
    <a
      href={to}
      target={to.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className={styles.link}
    >
      {name}
    </a>
  ) : (
    <Link to={to} className={styles.link}>
      {name}
    </Link>
  );
}
