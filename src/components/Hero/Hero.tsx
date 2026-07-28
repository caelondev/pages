import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.animation = `slideUp 0.6s ease-out`;
    }
  }, []);

  return (
    <div ref={ref} className={styles.hero}>
      <div className={styles.info}>
        <div className={styles.profile}>
          <img
            src="/caelon-cat.png"
            alt="caelon the cat"
            className={styles.profilePic}
          />

          <p className={styles.desc}>
            hello! i'm Jericho, also known as caelon, a back-end and a systems
            programmer from the Philippines.
          </p>
        </div>
        <div>
          <p className={styles.name}>caelon the cat</p>
        </div>
      </div>
    </div>
  );
}
