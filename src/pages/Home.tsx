import { CarouselHeader } from "../components/CarouselHeader/CarouselHeader";
import styles from "./Home.module.css";

export function Home() {
  return (
    <main>
      <CarouselHeader msg="caelon" className={styles.title} />
      <p className={styles.subtitle}>systems programmer</p>
      <hr />
      <div className={styles.parent}>
        <div className={styles.links}>
          <a href="mailto:me@caelondev.net">email</a>
          <a href="https://blog.caelondev.net/">blog</a>
          <a href="https://git.caelondev.net/">codeberg</a>
        </div>

        <article className={styles.story}>
          <p>hello. i'm Jericho. also known as caelon.</p>

          <p>my "programming" journey started when i was 10.</p>

          <p>
            i LOVE playing minecraft. during break time, when i'm bored, pretty
            much anytime.
          </p>

          <p>
            one day, i was watching a youtube video about some clickbait-y
            "summoning herobrine" shenanigans. while i was watching, i noticed
            them holding a command block.
          </p>

          <p>as i looked at it, it felt... weird.</p>

          <p>
            i played minecraft all day, yet somehow, this was my first time
            seeing this block. so, into minecraft i went. i typed
          </p>

          <code className={styles.command}>/give @s command_block</code>

          <p>and started tinkering with it.</p>

          <p>
            it felt awesome. the command block was following the commands i gave
            it, as if it was a tiny computer that actually listened to me...
          </p>

          <p>fast forward a few years... i was 13.</p>

          <p>
            it was vacation, right after our school's christmas party. i was
            watching a load of youtube videos when i suddenly thought to myself:
          </p>

          <blockquote className={styles.quote}>
            oh no, what if after this vacation, the teachers ask us what we did
            during vacation? what am i going to tell them??
          </blockquote>

          <p>and then this weird idea came into my mind...</p>

          <blockquote className={styles.quote}>
            ah! that's it! i'm going to learn how to code!
          </blockquote>

          <p>
            i hopped on youtube, watched a lot of videos, and the rest was
            history...
          </p>

          <p>i learned EVERYTHING.</p>

          <p>
            i started with python, then got absolutely bamboozled with
            information and burned out pretty quickly because i couldn't
            visually see my progress.
          </p>

          <p>so i moved on to web development.</p>

          <p>
            everything went smoothly. i was making websites, learning how
            browsers worked, and generally having a good time.
          </p>

          <p>but eventually, i started feeling trapped.</p>

          <p>
            the browser felt like it was holding my hand. everything i wanted to
            make had to go through this giant sandbox, and it felt like i
            couldn't really make anything without the browser getting involved
            somehow.
          </p>

          <p>so i tried making bots.</p>

          <p>discord bots, specifically.</p>

          <p>
            and honestly, it felt nice. i made a bot with a bunch of
            functionalities, and for the first time, i felt like i was making
            something that actually did stuff on its own.
          </p>

          <p>
            but then, a few months later, a guy named "Core Dumped" appeared on
            my recommendations page on youtube.
          </p>

          <p>and i was like:</p>

          <blockquote className={styles.quote}>
            woah, that's cool! that's how a CPU works???
          </blockquote>

          <p>
            i got addicted to his channel. to the point where i'd watch the same
            videos over and over again, simply because of how amazed i was by
            what was happening underneath all the abstractions.
          </p>

          <p>then an idea came into my mind:</p>

          <blockquote className={styles.quote}>
            i wanna learn systems programming.
          </blockquote>

          <p>and boom.</p>

          <p>here i am right now.</p>

          <p>
            the first language i started with in systems programming was Rust.
            yes, i know. pretty brutal choice.
          </p>

          <p>but eventually, i also got into languages like Go and Zig.</p>

          <p>
            and somehow, that kid who just wanted to mess around with a weird
            block in minecraft ended up becoming a systems programmer.
          </p>
        </article>
      </div>
    </main>
  );
}
