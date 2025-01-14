"use client";

import React from "react";
import clsx from "clsx";
import { Rss, Sun, Moon } from "react-feather";

import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";
import Cookie from "js-cookie";

import styles from "./Header.module.css";
import { DARK_TOKENS, LIGHT_TOKENS } from "@/constants";

function Header({ initialTheme, className, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme);

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    Cookie.set("color-theme", newTheme, { expires: 1000 });
    setTheme(newTheme);

    // avoid having to refresh to update theme
    const root = document.documentElement;
    const newTokens = theme === "light" ? DARK_TOKENS : LIGHT_TOKENS;

    Object.entries(newTokens).map(([key, value]) => {
      root.style.setProperty(key, value);
    });

    root.setAttribute("data-color-theme", theme);
  };

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </button>
        <button className={styles.action} onClick={handleToggleTheme}>
          {theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
