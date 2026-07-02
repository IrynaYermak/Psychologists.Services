import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import style from "./Header.module.css";
import type { AuthMode } from "../../types/authMode";
const user = null; // Simulate user authentication status
// const user = {
//   name: "John Doe",
// };

interface HeaderProps {
  onOpen?: (mode: AuthMode) => void;
}

export default function Header({ onOpen }: HeaderProps) {
  return (
    <header className={style.header}>
      <div className={`container ${style.headerContainer}`}>
        <NavLink className={style.link} to="/">
          <svg className={style.logo} height={28}>
            <use href="/icons/sprite.svg#icon-Logo" />
          </svg>
        </NavLink>
        <nav className={style.navbar}>
          <ul className={style.navbarList}>
            <li className={style.navbarItem}>
              <NavLink to={"/"} className={style.link}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"psychologists"} className={style.link}>
                Psychologists
              </NavLink>
            </li>

            {user && (
              <li>
                <NavLink to={"favorites"} className={style.link}>
                  Favorites
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        {user && (
          <div className={style.user}>
            <div className={style.userAvatar}>
              <svg width={24} height={24} fill="var(--hero-bg)">
                <use href="/icons/sprite.svg#icon-mdi_user" />
              </svg>
            </div>
            <p className={style.username}>{user.name}</p>
          </div>
        )}

        <div className={style.headerActions}>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpen("login")}
            // size="medium"
            text={user ? "Log out" : "Log In"}
          />
          {!user && (
            <Button
              type="button"
              variant="primary"
              // size="medium"
              onClick={() => onOpen("register")}
              text="Registration"
            />
          )}
        </div>
      </div>
    </header>
  );
}
