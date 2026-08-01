import { useEffect, useState } from "react";
import styles from "./JokeCard.module.css";

const CATEGORIES = [
  "Programming",
  "Misc",
  "Pun",
  "Spooky",
  "Christmas",
  "Dark",
  "Any",
] as const;

type Category = (typeof CATEGORIES)[number];

interface JokeFlags {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
  explicit: boolean;
}

interface JokeBase {
  category: string;
  id: number;
  safe: boolean;
  lang: string;
  flags: JokeFlags;
}

interface JokeSingle extends JokeBase {
  type: "single";
  joke: string;
}

interface JokeTwoPart extends JokeBase {
  type: "twopart";
  setup: string;
  delivery: string;
}

type Joke = JokeSingle | JokeTwoPart;

interface JokeCardProps {
  defaultCategory?: Category;
}

const FLAG_LABELS: (keyof JokeFlags)[] = [
  "nsfw",
  "religious",
  "political",
  "racist",
  "sexist",
  "explicit",
];

export function JokeCard({ defaultCategory = "Programming" }: JokeCardProps) {
  const [category, setCategory] = useState<Category>(defaultCategory);
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [revealed, setRevealed] = useState(false);

  async function fetchJoke(cat: Category) {
    setLoading(true);
    setError(false);
    setRevealed(false);
    try {
      const res = await fetch(`https://v2.jokeapi.dev/joke/${cat}`);
      const data = await res.json();
      if (data.error) throw new Error(data.message);

      const base: JokeBase = {
        category: data.category,
        id: data.id,
        safe: data.safe,
        lang: data.lang,
        flags: data.flags,
      };

      if (data.type === "twopart") {
        setJoke({
          ...base,
          type: "twopart",
          setup: data.setup,
          delivery: data.delivery,
        });
      } else {
        setJoke({
          ...base,
          type: "single",
          joke: data.joke,
        });
      }
    } catch {
      setError(true);
      setJoke(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJoke(category);
  }, [category]);

  const activeFlags = joke ? FLAG_LABELS.filter((f) => joke.flags[f]) : [];

  return (
    <div className={styles.jokeCard}>
      <div className={styles.topRow}>
        <span className={styles.label}>joke</span>
        <select
          className={styles.select}
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.body}>
        {loading && <div className={styles.status}>loading...</div>}
        {!loading && error && (
          <div className={styles.status}>couldn't fetch a joke</div>
        )}

        {!loading && !error && joke?.type === "single" && (
          <p className={styles.text}>{joke.joke}</p>
        )}

        {!loading && !error && joke?.type === "twopart" && (
          <>
            <p className={styles.text}>{joke.setup}</p>
            {revealed && <p className={styles.delivery}>{joke.delivery}</p>}
          </>
        )}
      </div>

      {!loading && !error && joke && (
        <div className={styles.metaRow}>
          <span className={styles.badge}>{joke.category}</span>
          <span
            className={`${styles.badge} ${
              joke.safe ? styles.safe : styles.unsafe
            }`}
          >
            {joke.safe ? "safe" : "not safe"}
          </span>
          <span className={styles.badge}>{joke.lang}</span>
          <span className={styles.idTag}>#{joke.id}</span>
        </div>
      )}

      {!loading && !error && activeFlags.length > 0 && (
        <div className={styles.flagsRow}>
          {activeFlags.map((f) => (
            <span key={f} className={styles.flag}>
              {f}
            </span>
          ))}
        </div>
      )}

      <div className={styles.buttonRow}>
        <button
          className={styles.reroll}
          onClick={() => fetchJoke(category)}
          disabled={loading}
        >
          another one
        </button>
        {!loading && !error && joke?.type === "twopart" && !revealed && (
          <button className={styles.reveal} onClick={() => setRevealed(true)}>
            show punchline
          </button>
        )}
      </div>
    </div>
  );
}
