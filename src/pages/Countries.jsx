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

  const getCountries = async () => {
    try {
      const res = await fetch(`${api}/all`)
      if (!res.ok) throw new Error("Something went wrong!")
      const data = await res.json()
      setCountries(data.slice(0, 10))
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
        darkMode ? "dark:bg-Dark-Mode-Background " : "bg-gray-200 "
      } `}
    >
      <section className={` container mx-auto p-8`}>
        {isLoading ? (
          <div className=" flex flex-col md:flex-row justify-center">
            <h4
              className={`${
                darkMode ? "dark:text-white" : "text-Very-Dark-Blue "
              }font-medium text-lg `}
            >
              Loading........
            </h4>
          </div>
        ) : error ? (
          <div className=" flex flex-col md:flex-row justify-center">
            <h4
              className={`${
                darkMode ? "dark:text-white" : "text-Very-Dark-Blue"
              } font-medium text-lg  `}
            >
              {error}
            </h4>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
              <SearchCountry onSearch={searchCountry} />
              <FilterRegion
                onSelect={filterRegion}
                getCountries={getCountries}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {countries.map((country) => (
                <Article key={country.name.common} {...country} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default Countries
