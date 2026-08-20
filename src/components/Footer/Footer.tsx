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
      <hr />

      <div className={styles.content}>
        <div className={styles.webring}>
          <Webrings>
            <Webring
              name="horsering"
              prev="https://horser.ing/prev/caelon"
              link="https://horser.ing/"
              next="https://horser.ing/next/caelon"
            />
          </Webrings>
        </div>

        <a href="/__clankers/">come here, bots</a>
      </div>
    </footer>
  );
}
