import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import style from "./Header.module.css";
import type { AuthMode } from "../../types/authMode";
import { useAuthStore } from "../../store/authStore";
import { logout } from "../../services/authServices";
import { useEffect, useState } from "react";

interface HeaderProps {
  onOpen?: (mode: AuthMode) => void;
}

export default function Header({ onOpen }: HeaderProps) {
  const user = useAuthStore((state) => state.user);
  const handleAuthClick = async () => {
    if (user) {
      await logout();
      return;
    }

    onOpen?.("login");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <header className={style.header}>
      <div className={`container ${style.headerContainer}`}>
        <NavLink className={style.link} to="/" onClick={closeMenu}>
          <svg className={style.logo} height={28}>
            <use href="/icons/sprite.svg#icon-Logo" />
          </svg>
        </NavLink>
        <nav className={style.navbar}>
          <ul className={style.navbarList}>
            <li className={style.navbarItem}>
              <NavLink
                to={"/"}
                end
                className={({ isActive }) =>
                  `${style.link} ${isActive ? style.active : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"psychologists"}
                className={({ isActive }) =>
                  `${style.link} ${isActive ? style.active : ""}`
                }
              >
                Psychologists
              </NavLink>
            </li>

            {user && (
              <li>
                <NavLink
                  to={"favorites"}
                  className={({ isActive }) =>
                    `${style.link} ${isActive ? style.active : ""}`
                  }
                >
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
            onClick={handleAuthClick}
            // size="medium"
            text={user ? "Log out" : "Log In"}
          />
          {!user && (
            <Button
              type="button"
              variant="primary"
              // size="medium"
              onClick={() => onOpen?.("register")}
              text="Registration"
            />
          )}
        </div>
        <button
          type="button"
          className={style.burgerButton}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <use href="/icons/sprite.svg#icon-close" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div id="mobile-navigation" className={style.mobileMenu}>
          <nav aria-label="Mobile navigation">
            <ul className={style.mobileNav}>
              <li>
                <NavLink to="/" end onClick={closeMenu}>
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/psychologists" onClick={closeMenu}>
                  Psychologists
                </NavLink>
              </li>

              {user && (
                <li>
                  <NavLink to="/favorites" onClick={closeMenu}>
                    Favorites
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>

          <div className={style.mobileActions}>
            <Button
              type="button"
              variant="secondary"
              text={user ? "Log out" : "Log In"}
              onClick={async () => {
                closeMenu();
                await handleAuthClick();
              }}
            />

            {!user && (
              <Button
                type="button"
                variant="primary"
                text="Registration"
                onClick={() => {
                  closeMenu();
                  onOpen?.("register");
                }}
              />
            )}
          </div>
        </div>
      )}
    </header>
  );
}
