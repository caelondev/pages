import { useEffect, useState, useRef } from "react";
import styles from "./MusicInfo.module.css";

interface TrackInfo {
  track: string;
  artist: string;
  isPlaying: boolean;
  url: string;
  scrobbledAt: string | null;
}

export function MusicInfo() {
  const [info, setInfo] = useState<TrackInfo | null>(null);
  const infoRef = useRef<TrackInfo | null>(null);
  const [status, setStatus] = useState("loading...");
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef(true);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number>(0);
  const prevTrackRef = useRef<{ track: string; artist: string } | null>(null);

  function updateLoading(value: boolean) {
    loadingRef.current = value;
    setLoading(value);
  }

  useEffect(() => {
    let cancelled = false;

    async function fetchNowPlaying() {
      try {
        const res = await fetch("https://api.caelondev.net/lastfm");
        const data = await res.json();
        const track = data.recenttracks?.track?.[0];

        if (cancelled) return;

        if (!track) {
          setStatus("no listens yet");
          setInfo(null);
          updateLoading(false);
          return;
        }

        const isPlaying = track["@attr"]?.nowplaying === "true";
        const trackChanged =
          track.name !== prevTrackRef.current?.track ||
          track.artist["#text"] !== prevTrackRef.current?.artist;

        setStatus(isPlaying ? "now playing" : "last played");

        const nextInfo: TrackInfo = {
          track: track.name,
          artist: track.artist["#text"],
          isPlaying,
          url: track.url,
          scrobbledAt: track.date?.["#text"] ?? null,
        };
        setInfo(nextInfo);
        infoRef.current = nextInfo;
        updateLoading(false);

        prevTrackRef.current = {
          track: track.name,
          artist: track.artist["#text"],
        };

        if (trackChanged) {
          progressRef.current = 0;
          setProgress(0);
        }
      } catch {
        if (!cancelled) {
          setStatus("offline");
          setInfo(null);
          updateLoading(false);
        }
      }
    }

    let pollTimeout: ReturnType<typeof setTimeout>;

    async function pollLoop() {
      await fetchNowPlaying();
      if (cancelled) return;

      const isPlayingNow = infoRef.current?.isPlaying;
      const delay = isPlayingNow ? 5000 : 25000;

      pollTimeout = setTimeout(() => {
        if (document.visibilityState === "visible") {
          pollLoop();
        } else {
          const resume = () => {
            if (document.visibilityState === "visible") {
              document.removeEventListener("visibilitychange", resume);
              pollLoop();
            }
          };
          document.addEventListener("visibilitychange", resume);
        }
      }, delay);
    }

    pollLoop();

    const tick = setInterval(() => {
      if (loadingRef.current) return;
      if (document.visibilityState !== "visible") return;
      progressRef.current = Math.min(progressRef.current + 1, 100);
      setProgress(progressRef.current);
    }, 1500);

    return () => {
      cancelled = true;
      clearTimeout(pollTimeout);
      clearInterval(tick);
    };
  }, []);

  return (
    <div className={styles.musicInfo}>
      <div className={styles.info}>
        {loading ? (
          <>
            <div className={`${styles.skeleton} ${styles.skeletonStatus}`} />
            <div className={`${styles.skeleton} ${styles.skeletonTrack}`} />
            <div className={`${styles.skeleton} ${styles.skeletonArtist}`} />
          </>
        ) : (
          <>
            <div
              className={`${styles.status} ${
                info?.isPlaying ? styles.live : ""
              }`}
            >
              {status}
              {!info?.isPlaying && info?.scrobbledAt && (
                <span className={styles.scrobbledAt}>
                  {" "}
                  · {info.scrobbledAt}
                </span>
              )}
            </div>
            <a
              className={styles.track}
              href={info?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {info?.track ?? "--"}
            </a>
            <div className={styles.artist}>{info?.artist ?? "--"}</div>
          </>
        )}
        <input
          className={styles.progress}
          type="range"
          min={0}
          max={100}
          value={progress}
          readOnly
          tabIndex={-1}
        />
      </div>
    </div>
  );
}
