import { Hero } from "../components/Hero/Hero";
import { LinkInfo } from "../components/LinkInfo/LinkInfo";

export function Home() {
  const links = [
    { to: "mailto:me@caelondev.net", name: "email" },
    { to: "https://blog.caelondev.net/", name: "blog" },
    { to: "https://git.caelondev.net/", name: "codeberg" },
    { to: "/projects", name: "projects" },
    { to: "/__clankers", name: "come here, bots" },
  ];

  return (
    <main>
      <Hero />
      {links.map((link, index) => (
        <LinkInfo key={link.name} to={link.to} name={link.name} index={index} />
      ))}
    </main>
  );
}
