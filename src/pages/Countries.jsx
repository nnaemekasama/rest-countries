import FilterRegion from "../components/FilterRegion"
import SearchCountry from "../components/SearchCountry"
import { useEffect, useState } from "react"
import Article from "../components/Article"
import { Link } from "react-router-dom"
import { api } from "../utility/api"
import { useTheme } from "../ThemeContext"

const Countries = () => {
  const { darkMode, toggleDarkMode } = useTheme()
  const [countries, setCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const totalCountries = countries.length
  const pageSize = 20
  const pages = Math.floor(totalCountries / pageSize)

  const goToPrev = () => {
    const prevPage = Math.max(currentPage - 1, 1)
    setCurrentPage(prevPage)
  }
  const goToNext = () => {
    const nextPage = Math.min(currentPage + 1, pages)
    setCurrentPage(nextPage)
  }

  const start = pageSize * (currentPage - 1)
  const end = pageSize * currentPage
  const countriesPerPage = countries.slice(start, end)

  const canGoPrev = currentPage > 1
  const canGoNext = currentPage < pages

  const getCountries = async () => {
    try {
      const res = await fetch(`${api}/all`)
      if (!res.ok) throw new Error("Something went wrong!")
      const data = await res.json()
      setCountries(data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error.message)
    }
  }

  const searchCountry = async (name) => {
    try {
      const res = await fetch(`${api}/name/${name}`)
      if (!res.ok) throw new Error("Something went wrong!")
      const data = await res.json()
      setCountries(data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error.message)
    }
  }

  const filterRegion = async (region) => {
    try {
      const res = await fetch(`${api}/region/${region}`)
      if (!res.ok) throw new Error("Something went wrong!")
      const data = await res.json()
      setCountries(data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error.message)
    }
  }

  useEffect(() => {
    getCountries()
  }, [])

  return (
    <div
      className={`${
        darkMode ? "bg-Dark-Mode-Background " : "bg-gray-200 "
      } transition-all duration-700 `}
    >
      <section className={` container mx-auto p-8`}>
        {isLoading ? (
          <div className=" flex h-screen items-center justify-center">
            <h4
              className={`${
                darkMode
                  ? "text-white font-medium text-lg"
                  : "text-Very-Dark-Blue font-medium text-lg"
              } `}
            >
              Loading........
            </h4>
          </div>
        ) : error ? (
          <div className=" flex h-screen items-center justify-center">
            <h4
              className={`${
                darkMode
                  ? "text-white font-medium text-lg"
                  : "text-Very-Dark-Blue font-medium text-lg"
              }   `}
            >
              {error}
            </h4>
          </div>
        ) : countries ? (
          <>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
              <SearchCountry onSearch={searchCountry} />
              <FilterRegion
                onSelect={filterRegion}
                getCountries={getCountries}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {countriesPerPage.map((country) => (
                <Article key={country.name.common} {...country} />
              ))}
            </div>
            <div className="flex justify-center items-center gap-8 mt-8">
              <button
                className={`${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700 text-gray-400"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }  py-2 px-6 rounded shadow inline-block mb-8 md:mt-8  transition-all duration-200 `}
                onClick={goToPrev}
                disabled={!canGoPrev}
              >
                Prev
              </button>
              <span
                className={`font-medium text-sm ${
                  darkMode ? "text-White" : "text-Very-Dark-Blue"
                }`}
              >
                {currentPage} of {pages}
              </span>
              <button
                className={`${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700 text-gray-400"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }  py-2 px-6 rounded shadow inline-block mb-8 md:mt-8  transition-all duration-200 `}
                onClick={goToNext}
                disabled={!canGoNext}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p>No Data Available</p>
        )}
      </section>
    </div>
  )
}

export default Countries
