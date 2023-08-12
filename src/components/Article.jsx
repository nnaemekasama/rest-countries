import React from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../ThemeContext"

const Article = ({ flags, name, population, region, capital }) => {
  const { darkMode, toggleDarkMode } = useTheme()
  return (
    <>
      <Link to={`/${name.common}`}>
        <div
          className={`${
            darkMode
              ? " dark:bg-Very-Dark-Blue dark:hover:bg-Dark-Blue"
              : "bg-white hover:bg-gray-200"
          } transition-all duration-200 rounded-lg shadow overflow-hidden`}
        >
          <img
            src={flags.svg}
            alt="flag"
            className="md:h-64 w-full object-cover"
          />
          <div className="p-4">
            <h2
              className={`${
                darkMode ? "dark:text-white" : "text-Very-Dark-Blue"
              } font-bold text-lg mb-2 `}
            >
              {name.common}
            </h2>
            <ul className={`flex flex-col items-starts justify-start gap-2`}>
              <li
                className={`${
                  darkMode ? "dark:text-Dark-Gray" : "text-Very-Dark-Blue"
                }`}
              >
                Population: {population.toLocaleString()}
              </li>
              <li
                className={`${
                  darkMode ? "dark:text-Dark-Gray" : "text-Very-Dark-Blue"
                }`}
              >
                Region: {region}
              </li>
              <li
                className={`${
                  darkMode ? "dark:text-Dark-Gray" : "text-Very-Dark-Blue"
                }`}
              >
                Capital: {capital}
              </li>
            </ul>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Article
