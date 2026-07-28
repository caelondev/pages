import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.animation = `slideUp 0.6s ease-out`;
    }
  }, []);

  return (
    <div ref={ref} className={styles.hero}>
      <div className={styles.info}>
        <div className={styles.profile}>
          <div className={styles.picWrapper}>
            <div
              className={styles.picSkeleton}
              data-visible={!imgLoaded}
            />
            <img
              src="/caelon-cat.png"
              alt="caelon the cat"
              className={styles.profilePic}
              data-visible={imgLoaded}
              onLoad={() => setImgLoaded(true)}
            />
          </div>

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

