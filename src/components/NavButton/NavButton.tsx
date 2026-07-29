import { NavLink } from "react-router-dom";
import styles from "./NavButton.module.css";

interface NavButtonProps {
  to: string;
  name: string;
}

export function NavButton({ to, name }: NavButtonProps) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        isActive ? styles.active : styles.link
      }
    >
      {name}
    </NavLink>
  );
}
