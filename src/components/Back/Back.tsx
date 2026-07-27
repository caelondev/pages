import { Link } from "react-router-dom";
import styles from "./Back.module.css";

export function Back() {
  return (
    <>
      <Link to="/" className={styles.back}>
        <p>{"> back"}</p>
      </Link>
      <hr className={styles.hr} />
    </>
  );
}
