import React from "react";
import styles from "./Webrings.module.css";

interface WebringsProp {
  children: React.ReactNode;
}

export function Webrings({ children }: WebringsProp) {
  return (
    <>
      <hr className={styles.topHr}/>
      {React.Children.map(children, (v) => v)}
      <hr className={styles.bottomHr}/>
    </>
  );
}
