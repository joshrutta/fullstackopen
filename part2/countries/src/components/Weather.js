import axios from 'axios'
import { useState, useEffect } from 'react'

const Weather = ({ lat, lng, countryName }) => {

    const [temp, setTemp] = useState(0)
    const [iconCode, setIconCode] = useState('')
    const [wind, setWind] = useState('')

    const convertToFahrenheit = (kelvinTemp) => {
        const fTemp = (kelvinTemp - 273.15) * (9 / 5) + 32
        return (Math.round(fTemp * 100) / 100).toFixed(2);
    }

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${process.env.REACT_APP_API_KEY}`)
            .then(
                response => {
                    console.log("response: ", response);
                    setTemp(convertToFahrenheit(response.data.main.temp));
                    setIconCode(response.data.weather[0].icon);
                    setWind(response.data.wind.speed);
                }
            )
    }, [])

    if (iconCode.length !== 0) {
        return (
            <div>
                <h2>Weather in {countryName}</h2>
                <p>temperature is {temp} Fahrenheit</p>
                <img src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`} alt={`${countryName} weather`} />
                {<p>wind {wind} m/s</p>}
            </div >
        )
    } else {
        return <p>loading weather data...</p>
    }
}

export default Weather