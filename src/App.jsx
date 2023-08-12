import { useState } from "react"
import Countries from "./pages/Countries"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Country from "./pages/Country"
import Header from "./components/Header"
import { ThemeProvider } from "./ThemeContext"
function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Countries />}></Route>
            <Route path="/:name" element={<Country />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
