import { useEffect, useState, useRef } from "react";
import styles from "./MusicInfo.module.css";

interface TrackInfo {
  track: string;
  artist: string;
  album: string | null;
  isPlaying: boolean;
  url: string;
  scrobbledAt: string | null;
  scrobbledAtUts: number | null;
}

interface LastfmMeta {
  totalScrobbles: number | null;
}

function timeAgo(uts: number | null): string | null {
  if (!uts) return null;
  const diff = Date.now() / 1000 - uts;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function MusicInfo() {
  const [info, setInfo] = useState<TrackInfo | null>(null);
  const infoRef = useRef<TrackInfo | null>(null);
  const [meta, setMeta] = useState<LastfmMeta>({ totalScrobbles: null });
  const [status, setStatus] = useState("loading...");
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef(true);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number>(0);
  const prevTrackRef = useRef<{ track: string; artist: string } | null>(null);
  const [, forceTick] = useState(0);

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
        const total = data.recenttracks?.["@attr"]?.total;

        if (cancelled) return;

        setMeta({ totalScrobbles: total ? parseInt(total, 10) : null });

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

        const albumName = track.album?.["#text"]?.trim() || null;

        const nextInfo: TrackInfo = {
          track: track.name,
          artist: track.artist["#text"],
          album: albumName,
          isPlaying,
          url: track.url,
          scrobbledAt: track.date?.["#text"] ?? null,
          scrobbledAtUts: track.date?.uts ? parseInt(track.date.uts, 10) : null,
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

    const agoTick = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      forceTick((n) => n + 1);
    }, 30000);

    return () => {
      cancelled = true;
      clearTimeout(pollTimeout);
      clearInterval(tick);
      clearInterval(agoTick);
    };
  }, []);

  const relativeTime =
    info && !info.isPlaying ? timeAgo(info.scrobbledAtUts) : null;

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
            <div className={styles.topRow}>
              <div
                className={`${styles.status} ${
                  info?.isPlaying ? styles.live : ""
                }`}
              >
                {status}
                {relativeTime && (
                  <span className={styles.scrobbledAt}> · {relativeTime}</span>
                )}
              </div>
              <div className={styles.rightMeta}>
                {meta.totalScrobbles !== null && (
                  <div className={styles.scrobbleCount}>
                    {meta.totalScrobbles.toLocaleString()} scrobbles
                  </div>
                )}
                <div className={styles.source}>YT Music</div>
              </div>
            </div>
            <a
              className={styles.track}
              href={info?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {info?.track ?? "--"}
            </a>
            <div className={styles.artist}>
              {info?.artist ?? "--"}
              {info?.album && (
                <span className={styles.album}> — {info.album}</span>
              )}
            </div>
          </>
        )}
        {!loading && info?.isPlaying && (
          <input
            className={styles.progress}
            type="range"
            min={0}
            max={100}
            value={progress}
            readOnly
            tabIndex={-1}
          />
        )}
      </div>
    </div>
  );
}
