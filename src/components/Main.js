import React, { useEffect, useState } from 'react'

function Main() {

    const [isloading, setIsloading] = useState(false);
    const [weather, setWeather] = useState({});
    const [city, setCity] = useState("Baku");
    const [situation, setSituation] = useState(false);


    useEffect(() => {
        setIsloading(true)
        fetch(`https://api.weatherapi.com/v1/current.json?key=f7b245539b934d8ea38101427222212&q=${city}&aqi=no`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setWeather(data);
                setSituation(false);
                setIsloading(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [situation])

    const getCity = (event) => {
        setCity(event.target.value)
    }

    const submitCity = (event) => {
        event.preventDefault();
        setSituation(true);
    }


    return (
        <div className='main'>
            <div className='main--inside'>


                <form onSubmit={submitCity} className='form'>
                    <input onChange={getCity} value={city} className='form--input' />
                    <button className='form--button'>Get Forecast</button>
                </form>

                {
                    isloading
                        ?
                        <div className='loader'> <span className="loader--inside"></span> </div>
                        :
                        weather?.location ?
                            <div className='city-info'>
                                <span className='city'>{weather?.location?.name},{weather?.location?.country}</span>
                                <span className='weather-img'>
                                    <img src={weather?.current?.condition?.icon} alt='' />
                                </span>
                                <span style={{ marginBottom: "5px" }}>{weather?.current?.condition?.text}</span>
                                <span style={{ marginBottom: "5px" }}>{weather?.current?.temp_c}°</span>
                                <span style={{ marginBottom: "5px" }}>{weather?.current?.temp_c - 5}°</span>
                                <span>
                                    H {weather?.current?.humidity}%
                                    Wind {weather?.current?.wind_mph} MPH
                                    Cloud {weather?.current?.cloud}%
                                </span>
                            </div>
                            : <h1>City Not Found</h1>

                }

            </div>
        </div>
    )
}

export default Main