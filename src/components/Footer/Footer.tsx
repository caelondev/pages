import { useEffect, useRef } from "react";
import { Webring } from "../Webring/Webring";
import { Webrings } from "../Webrings/Webrings";
import styles from "./Footer.module.css";

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.style.animation = `slideUp 0.4s ease-out`;
    }
  }, []);
  return (
    <footer className={styles.footer} ref={ref}>
      <div className={styles.webring}>
        <Webrings>
          <Webring
            name="horsering"
            prev="https://horser.ing/prev/caelondev"
            link="https://horser.ing/"
            next="https://horser.ing/next/caelondev"
          />
        </Webrings>
      </div>
      <a href="/__clankers/">come here, bots</a>
    </footer>
  );
}
