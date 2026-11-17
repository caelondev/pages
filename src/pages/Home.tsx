import BlogPost from "../components/BlogPost/BlogPost";
import { Hero } from "../components/Hero/Hero";
import { LinkInfo, type LinkInfoProps } from "../components/LinkInfo/LinkInfo";

export function Home() {
  // index = bogus value
  const links: LinkInfoProps[] = [
    { to: "blog.caelondev.net", name: "blog", index: 0 },
    { to: "git.caelondev.net", name: "codeberg", index: 0 },
    { to: "mailto:me@caelondev.net", name: "email", index: 0 },
  ]
  return (
    <main>
      <Hero />
      <hr />
      <BlogPost />
      {links.map((v, i) => <LinkInfo to={v.to} name={v.name} index={i} desc={v.desc} note={v.note} />)}
    </main >
  );
}
