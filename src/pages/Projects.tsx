import { LinkInfo } from "../components/LinkInfo/LinkInfo";
import styles from "./Projects.module.css";

export function Projects() {
  const links = [
    {
      name: "brainfuzz",
      desc: "a brainf*ck interpreter written in zig",
      to: "https://codeberg.org/caelondev/brainfuzz",
      note: "inactive",
    },
    {
      name: "garrote",
      desc: "a queue-based esolang written in rust",
      to: "https://codeberg.org/caelondev/garrote",
      note: "inactive",
    },
    {
      name: "silver",
      desc: "a simple node-based text formatter",
      to: "https://github.com/TheophilusWorks/silver",
      note: "inactive",
    },
    {
      name: "conduit",
      desc: "an unofficial FCA typescript wrapper",
      to: "https://github.com/TheophilusWorks/conduit",
      note: "inactive",
    },
  ];

  return (
    <main className={styles.main}>
      {links.map((link, index) => (
        <LinkInfo
          key={`${link.name}-${index}`}
          desc={link.desc}
          to={link.to}
          name={link.name}
          note={link.note}
          index={index}
        />
      ))}
    </main>
  );
}
