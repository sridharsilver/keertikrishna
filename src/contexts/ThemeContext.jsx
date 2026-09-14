import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Reading theme: 'parchment' | 'sepia' | 'white' | 'midnight'
  const [readingTheme, setReadingTheme] = useState(() => {
    return localStorage.getItem("kk_reading_theme") || "parchment";
  });

  // Font size multiplier: 'sm' | 'base' | 'lg' | 'xl' | '2xl'
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem("kk_font_size") || "base";
  });

  // Font style preference: 'serif' | 'sans' | 'poetry'
  const [fontFamily, setFontFamily] = useState(() => {
    return localStorage.getItem("kk_font_family") || "serif";
  });

  // Line height preference: 'normal' | 'relaxed' | 'loose'
  const [lineHeight, setLineHeight] = useState(() => {
    return localStorage.getItem("kk_line_height") || "relaxed";
  });

  // Distraction-free focus mode
  const [isFocusMode, setIsFocusMode] = useState(false);

  useEffect(() => {
    const isDark = readingTheme === "midnight";
    document.body.className = `theme-${readingTheme} transition-reading ${isDark ? "dark" : ""}`.trim();
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("kk_reading_theme", readingTheme);
  }, [readingTheme]);

  useEffect(() => {
    localStorage.setItem("kk_font_size", fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("kk_font_family", fontFamily);
  }, [fontFamily]);

  useEffect(() => {
    localStorage.setItem("kk_line_height", lineHeight);
  }, [lineHeight]);

  const increaseFontSize = () => {
    const sizes = ["sm", "base", "lg", "xl", "2xl"];
    const currentIndex = sizes.indexOf(fontSize);
    if (currentIndex < sizes.length - 1) {
      setFontSize(sizes[currentIndex + 1]);
    }
  };

  const decreaseFontSize = () => {
    const sizes = ["sm", "base", "lg", "xl", "2xl"];
    const currentIndex = sizes.indexOf(fontSize);
    if (currentIndex > 0) {
      setFontSize(sizes[currentIndex - 1]);
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "sm":
        return "text-base md:text-lg";
      case "base":
        return "text-lg md:text-xl";
      case "lg":
        return "text-xl md:text-2xl";
      case "xl":
        return "text-2xl md:text-3xl";
      case "2xl":
        return "text-3xl md:text-4xl";
      default:
        return "text-lg md:text-xl";
    }
  };

  const getFontFamilyClass = () => {
    switch (fontFamily) {
      case "serif":
        return "font-telugu-serif";
      case "sans":
        return "font-telugu-sans";
      case "poetry":
        return "font-telugu-poetry";
      default:
        return "font-telugu-serif";
    }
  };

  const getLineHeightClass = () => {
    switch (lineHeight) {
      case "normal":
        return "leading-normal";
      case "relaxed":
        return "leading-relaxed md:leading-[2.1]";
      case "loose":
        return "leading-loose md:leading-[2.4]";
      default:
        return "leading-relaxed md:leading-[2.1]";
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        readingTheme,
        setReadingTheme,
        fontSize,
        setFontSize,
        increaseFontSize,
        decreaseFontSize,
        getFontSizeClass,
        fontFamily,
        setFontFamily,
        getFontFamilyClass,
        lineHeight,
        setLineHeight,
        getLineHeightClass,
        isFocusMode,
        setIsFocusMode
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
