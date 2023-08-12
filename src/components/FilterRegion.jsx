import React, { useState } from "react"
import { useTheme } from "../ThemeContext"
const FilterRegion = ({ onSelect, getCountries }) => {
  const { darkMode } = useTheme()

  const handleFilterRegion = (e) => {
    e.preventDefault()
    const regionName = e.target.value
    if (regionName === "All") {
      getCountries()
    }
    onSelect(regionName)
  }
  return (
    <form onSubmit={handleFilterRegion}>
      <select
        name="filter region"
        id="filter region"
        className={`${
          darkMode
            ? "dark:text-gray-400 dark:bg-gray-800 dark:focus:bg-gray-700 "
            : "bg-White focus:bg-white text-gray-600"
        } w-52 py-3 px-4 outline-none shadow rounded `}
        onChange={handleFilterRegion}
      >
        <option value="All">All</option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </form>
  )
}

export default FilterRegion
