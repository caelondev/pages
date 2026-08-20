import { useState } from "react";
import styles from "./CarouselHeader.module.css";

interface CarouselHeaderProps {
  msg: string;
  className: string;
}

export function CarouselHeader({ msg, className }: CarouselHeaderProps) {
  const [text, setText] = useState<string>(msg);

  const onClick = () => {
    let chars = text.split("");
    let first_char = chars.shift()!;
    chars.push(first_char);

    setText(chars.join(""));
  };

  return (
    <h1 className={`${className} ${styles.carouselHeader}`} onClick={onClick}>
      {text}
    </h1>
  );
}
