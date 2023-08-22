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
        darkMode ? "bg-Dark-Mode-Background " : "bg-gray-200 "
      } transition-all duration-700 md:min-h-screen`}
    >
      <section className="p-8 md:py-0 max-w-7xl mx-auto ">
        {isLoading ? (
          <div className=" flex justify-center items-center h-screen">
            <h4
              className={`${
                darkMode
                  ? "text-white font-medium text-lg "
                  : "text-Very-Dark-Blue font-medium text-lg "
              }`}
            >
              Loading........
            </h4>
          </div>
        ) : error ? (
          <div className=" flex h-screen items-center justify-center">
            <h4
              className={`${
                darkMode
                  ? "text-white  font-medium text-lg "
                  : "text-Very-Dark-Blue  font-medium text-lg "
              } `}
            >
              {error}
            </h4>
          </div>
        ) : (
          <>
            <Link
              to="/"
              className={`${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-400"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }  py-2 px-6 rounded shadow inline-block mb-8 md:mt-8  transition-all duration-200 `}
            >
              &larr; Back
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 md:place-items-start gap-8 md:gap-20 ">
              {country.map((item, i) => {
                const nativeNameKey = Object.keys(item.name.nativeName)[0]
                const language = Object.keys(item.languages)[0]
                const money = Object.keys(item.currencies)[0]
                return (
                  <React.Fragment key={i}>
                    <img
                      src={item.flags.svg}
                      alt={item.name.common}
                      className="object-cover max-sm:max-w-[100%] max-md:max-w-[70%]"
                    />

                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:place-items-center ">
                        <div className="">
                          <h2
                            className={`${
                              darkMode
                                ? "text-White font-bold text-4xl"
                                : "text-gray-900 font-bold text-4xl"
                            }  `}
                          >
                            {item.name.official}
                          </h2>
                          <ul
                            className={`${
                              darkMode ? "text-gray-400 " : "text-slate-700"
                            } mt-4 flex flex-col items-start justify-start gap-2 my-4 `}
                          >
                            <li>
                              Native Name:{" "}
                              {item.name.nativeName?.[nativeNameKey].common}{" "}
                            </li>
                            <li>
                              Population: {item.population.toLocaleString()}{" "}
                            </li>
                            <li>Region: {item.region} </li>
                            <li>Subregion:{item.subregion} </li>
                            <li>Capital:{item.capital[0]} </li>
                          </ul>
                        </div>
                        <div>
                          <ul
                            className={`flex flex-col gap-2 ${
                              darkMode ? "text-gray-400 " : "text-slate-700 "
                            }`}
                          >
                            <li>Currencies: {item.currencies?.[money].name}</li>
                            <li>Languages: {item.languages?.[language]}</li>
                          </ul>
                        </div>
                      </div>

                      {item.borders && (
                        <div className="max-md:mt-4">
                          <h2
                            className={`${
                              darkMode ? "text-white" : "text-gray-900"
                            } font-bold text-lg mb-2 `}
                          >
                            Borders:
                          </h2>
                          <span className="flex flex-wrap items-start justify-start gap-2">
                            {item.borders.map((border, i) => (
                              <p
                                className={`${
                                  darkMode
                                    ? "bg-gray-800 text-gray-400"
                                    : "bg-white text-gray-700"
                                } p-2 rounded text-xs tracking-wide shadow  transition-all duration-200 `}
                                key={i}
                              >
                                {border}
                              </p>
                            ))}
                          </span>
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                )
              })}
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default Country
