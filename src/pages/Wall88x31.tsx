import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Wall88x31.module.css";

const EMOTICONS = [":)", ":3", ":D", ";)", ":P", "^_^"];

async function fetch88x31Paths(url: string): Promise<string[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch index.json");
  return await res.json();
}

export function Wall88x31() {
  const [gifs, setGifs] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [emoticon] = useState(
    () => EMOTICONS[Math.floor(Math.random() * EMOTICONS.length)],
  );

  useEffect(() => {
    let objectUrls: string[] = [];

    async function main() {
      try {
        const paths = await fetch88x31Paths("/88x31/index.json");

        const urls = await Promise.all(
          paths.map(async (path) => {
            const res = await fetch(`/88x31/${path}`);
            if (!res.ok) throw new Error(`Failed to fetch ${path}`);

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);

            objectUrls.push(url);
            return url;
          }),
        );

        setGifs(urls);
        setLoaded(true);
      } catch (err) {
        console.error(err);
      }
    }

    main();

    return () => {
      objectUrls.forEach(URL.revokeObjectURL);
    };
  }, []);

  return (
    <div className={styles.wall88x31}>
      <h1>The 88x31 Wall</h1>
      <article>
        <p>
          i find these buttons kind of cool, especially if you know the history
          behind them.
        </p>

        <p>
          consider this page a memorial area for these buttons. (no, you can't
          click them)
        </p>
      </article>

      {!loaded && <p className={styles.loading}>Loading {emoticon}</p>}

      {loaded && (
        <div className={styles.container}>
          {gifs.map((gif, i) => (
            <motion.img
              key={i}
              src={gif}
              width={88}
              height={31}
              alt=""
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.1 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
