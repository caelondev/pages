import { CarouselHeader } from "../components/CarouselHeader/CarouselHeader";
import { LinkInfo } from "../components/LinkInfo/LinkInfo";
import styles from "./Projects.module.css";

export function Projects() {
  const links = [
    {
      name: "zenv",
      desc: "a .env manager made to easily deal with .env files",
      to: "https://codeberg.org/caelondev/zenv",
      note: "active",
    },
    {
      name: "cael-16",
      desc: "a 16-bit cpu emulator with its own ISA",
      to: "https://codeberg.org/caelondev/cael-16",
      note: "inactive",
    },
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
      <CarouselHeader msg="Projects" className={styles.header} />
      <article className={styles.article}>
        <p>these are some of the projects i've worked on in my freetime.</p>

        <p>not that many, but they're pretty useful to me.</p>
      </article>
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
