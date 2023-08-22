import React, { useState } from "react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { useTheme } from "../ThemeContext"

const SearchCountry = ({ onSearch }) => {
  const { darkMode } = useTheme()
  const [searchText, setSearchText] = useState("")

  const handleSearchCountry = (e) => {
    e.preventDefault()
    onSearch(searchText)
  }

  return (
    <form
      onSubmit={handleSearchCountry}
      autoComplete="off"
      className={`${
        darkMode ? "text-gray-400 bg-gray-800 " : "text-gray-600  bg-White"
      } max-w-4xl flex md:flex-1  shadow rounded transition-all duration-200  `}
    >
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search for a country by its name"
        required
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className={`${
          darkMode
            ? "text-gray-400 placeholder-gray-400 bg-gray-800"
            : " text-gray-600 placeholder-gray-600 bg-White"
        } py-3 px-4 w-full shadow rounded outline-none   transition-all duration-200`}
      />
      <button type="submit" className="p-2">
        <MagnifyingGlassIcon width={20} />
      </button>
    </form>
  )
}

export default SearchCountry
