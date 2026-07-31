import BlogPost from "../components/BlogPost/BlogPost";
import { Footer } from "../components/Footer/Footer";
import { Hero } from "../components/Hero/Hero";
import { LinkInfo } from "../components/LinkInfo/LinkInfo";
import { Webring } from "../components/Webring/Webring";
import { Webrings } from "../components/Webrings/Webrings";
import "./Home.module.css";

export function Home() {
  const links = [
    { to: "mailto:me@caelondev.net", name: "email" },
    { to: "https://blog.caelondev.net/", name: "blog" },
    { to: "https://git.caelondev.net/", name: "codeberg" },
  ];

  return (
    <main>
      <div className="content">
        <Hero />
        <Webrings>
          <Webring
            name="stabring"
            link="https://ring.stabbed.me"
            next="https://ring.stabbed.me/next/from/caelondev.is-a.dev"
            prev="https://ring.stabbed.me/prev/from/caelondev.is-a.dev"
          />
        </Webrings>
        <BlogPost />
        {links.map((link, index) => (
          <LinkInfo
            key={link.name}
            to={link.to}
            name={link.name}
            index={index}
          />
        ))}
      </div>
      <Footer />
    </main>
  );
}
