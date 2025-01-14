import React from "react";
import { Work_Sans, Spline_Sans_Mono } from "next/font/google";
import clsx from "clsx";

import { LIGHT_TOKENS, DARK_TOKENS } from "@/constants";

import ReduceMotionWrapper from "./ReduceMotionWrapper";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./styles.css";

import { cookies } from "next/headers";

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});
const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
});

async function RootLayout({ children }) {
  // TODO: Dynamic theme depending on user preference
  const cookie = await cookies();
  const theme = cookie.get("color-theme")?.value ?? "light";

  return (
    <html
      lang="en"
      className={clsx(mainFont.variable, monoFont.variable)}
      data-color-theme={theme}
      style={theme === "light" ? LIGHT_TOKENS : DARK_TOKENS}
    >
      <body>
        <ReduceMotionWrapper>
          <Header initialTheme={theme} />
          <main>{children}</main>
          <Footer />
        </ReduceMotionWrapper>
      </body>
    </html>
  );
}

export default RootLayout;
