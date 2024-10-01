import Weather from "./components/Weather"
import CureentWeather from './components/CureentWeather'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Weather />} />
          <Route path="/currentweather" element={<CureentWeather />} />
        </Routes>
      </BrowserRouter>
    </>


  )
}

export default App
