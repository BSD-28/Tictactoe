import { createContext, useState } from "react";

export const themeContext = createContext({
  currentTheme: "",
  setCurrentTheme: () => {},
  theme: {
    light: {
      bgColor: "",
    },
    dark: {
      bgColor: "",
    },
  },
});

export default function ThemeContext({ children }) {
  const [currentTheme, setCurrentTheme] = useState("light");

  return (
    <themeContext.Provider
      value={{
        currentTheme,
        setCurrentTheme,
        theme: {
          light: {
            bgColor: "min-h-screen bg-linear-to-br from-purple-600 via-blue-600 to-cyan-500",
          },
          dark: {
            bgColor: "min-h-screen bg-linear-to-br from-blue-950 via-cyan-900 to-purple-900",
          },
        },
      }}
    >
      {children}
    </themeContext.Provider>
  );
}
