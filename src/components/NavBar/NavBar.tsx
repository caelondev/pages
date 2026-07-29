import type React from "react";
import styles from "./NavBar.module.css";

interface WebringsProp {
  children: React.ReactNode;
}

export function NavBar({ children }: WebringsProp) {
  return <div className={styles.navbar}>{children}</div>
}
