import { useEffect, useState } from "react";
import styles from "./BlogPost.module.css";

interface LatestPost {
  title: string;
  link: string;
  date: string;
  tags: string[];
}

const RSS_URL = "https://blog.caelondev.net/rss.xml";

function parseLatestPost(xml: string): LatestPost | null {
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  const item = doc.querySelector("item");

  if (!item) return null;

  const title = item.querySelector("title")?.textContent ?? "";
  const link = item.querySelector("link")?.textContent ?? "";
  const pubDate = item.querySelector("pubDate")?.textContent ?? "";
  const tags = [...item.querySelectorAll("category")].map(
    (node) => node.textContent ?? "",
  );

  const date = pubDate ? new Date(pubDate).toISOString().slice(0, 10) : "";

  if (!title || !link) return null;

  return { title, link, date, tags };
}

export default function BlogPost() {
  const [post, setPost] = useState<LatestPost | null>(null);

  useEffect(() => {
    fetch(RSS_URL)
      .then((res) => res.text())
      .then((xml) => setPost(parseLatestPost(xml)))
      .catch(() => setPost(null));
  }, []);

  return (
    <div className={styles.card}>
      <span className={styles.label}>latest blog post</span>

      {/* reserved-space wrapper: fixed height, skeleton and content crossfade inside it */}
      <div className={styles.stage}>
        <div className={styles.skeleton} data-visible={!post}>
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonMeta} />
        </div>

        <div className={styles.content} data-visible={!!post}>
          <a href={post?.link ?? "#"} className={styles.link}>
            <span className={styles.prompt}>$</span>
            <span className={styles.title}>{post?.title}</span>
          </a>
          <div className={styles.meta}>
            <time className={styles.date}>{post?.date}</time>
            {post && post.tags.length > 0 && (
              <span className={styles.tags}>
                {post.tags.map((tag) => `#${tag}`).join(" ")}
              </span>
            )}
          </div>
        </div>
      </div>
      <hr className={styles.hr}/>
    </div>
  );
}

