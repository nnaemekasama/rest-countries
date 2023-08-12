import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { api } from "../utility/api"
import { useTheme } from "../ThemeContext"

const Country = () => {
  const { darkMode } = useTheme()

  const [country, setCountry] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const { name } = useParams()

  useEffect(() => {
    const getCountry = async () => {
      try {
        const res = await fetch(`${api}/name/${name}`)
        if (!res.ok) throw new Error("Something went wrong!")
        const data = await res.json()
        setIsLoading(false)
        setCountry(data)
      } catch (error) {
        setIsLoading(false)
        setError(error.message)
      }
    }
    getCountry()
  }, [name])

  return (
    <div
      className={`${
        darkMode ? "dark:bg-Dark-Mode-Background " : "bg-gray-200 "
      } `}
    >
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
        <section className="p-8 md:py-0 max-w-7xl mx-auto">
          <Link
            to="/"
            className={`${
              darkMode
                ? "dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }  py-2 px-6 rounded shadow inline-block mb-8 md:mt-8  transition-all duration-200 `}
          >
            &larr; Back
          </Link>
          {country.map((item, i) => {
            const nativeNameKey = Object.keys(item.name.nativeName)[0]
            const language = Object.keys(item.languages)[0]
            const money = Object.keys(item.currencies)[0]
            return (
              <div
                className="grid grid-cols-1 md:grid-cols-2 md:place-items-start md:h-screen gap-8 md:gap-20"
                key={i}
              >
                <img
                  src={item.flags.svg}
                  alt={item.name.common}
                  className="object-cover max-sm:max-w-[100%] max-md:max-w-[70%]"
                />

                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:place-items-center ">
                    <div className="">
                      {" "}
                      <h2
                        className={`${
                          darkMode
                            ? "dark:text-White font-bold text-4xl"
                            : "text-gray-900 font-bold text-4xl"
                        }  `}
                      >
                        {item.name.official}
                      </h2>
                      <ul
                        className={`${
                          darkMode ? "dark:text-gray-400 " : "text-slate-700"
                        } mt-4 flex flex-col items-start justify-start gap-2 my-4 `}
                      >
                        <li>
                          Native Name:{" "}
                          {item.name.nativeName?.[nativeNameKey].common}{" "}
                        </li>
                        <li>Population: {item.population.toLocaleString()} </li>
                        <li>Region: {item.region} </li>
                        <li>Subregion:{item.subregion} </li>
                        <li>Capital:{item.capital[0]} </li>
                      </ul>
                    </div>
                    <div>
                      <ul
                        className={`flex flex-col gap-2 ${
                          darkMode ? "dark:text-gray-400 " : "text-slate-700 "
                        }`}
                      >
                        <li>Top Level Domain</li>
                        <li>Currencies: {item.currencies?.[money].name}</li>
                        <li>Languages: {item.languages?.[language]}</li>
                      </ul>
                    </div>
                  </div>

                  {item.borders && (
                    <div className="max-md:mt-4">
                      <h2
                        className={`${
                          darkMode ? "dark:text-white" : "text-gray-900"
                        } font-bold text-lg mb-2 `}
                      >
                        Borders:
                      </h2>
                      <span className="flex flex-wrap items-start justify-start gap-2">
                        {item.borders.map((border, i) => (
                          <p
                            className={`${
                              darkMode
                                ? "dark:bg-gray-800 dark:text-gray-400"
                                : "bg-white text-gray-700"
                            } p-2 rounded text-xs tracking-wide shadow  `}
                            key={i}
                          >
                            {border}
                          </p>
                        ))}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </section>
      )}
    </div>
  )
}

export default Country
