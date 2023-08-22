import React from "react"
import { useTheme } from "../ThemeContext"
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <div
      className={`${
        darkMode
          ? "bg-Very-Dark-Blue hover:bg-Dark-Blue"
          : " bg-white hover:bg-gray-200"
      } sticky top-0 right-0 left-0   transition-all duration-200 shadow`}
    >
      <div className="mx-auto px-4 sm:px-8 py-4 flex justify-between items-center gap-4">
        <h2
          className={`${
            darkMode ? "text-white" : "text-Very-Dark-Blue"
          } font-bold text-sm sm:text-lg  `}
        >
          Where in the world?
        </h2>
        <div className="flex items-center gap-2 ">
          <button className="w-6" onClick={toggleDarkMode}>
            {darkMode ? (
              <SunIcon className={`fill-White text-White `} />
            ) : (
              <MoonIcon />
            )}
          </button>
          <span
            className={`${
              darkMode
                ? "text-white font-medium text-xs"
                : "text-Very-Dark-Blue font-medium text-xs"
            }`}
          >
            {darkMode ? "Dark Mode" : "Light Mode"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Header
