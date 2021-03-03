import { useState, useEffect } from 'react';
import './App.css';
import ScrollContainer from 'react-indiana-drag-scroll'
import countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));



function App() {

    // State
    const [apiDataWeather, setApiDataWeather] = useState({});
    const [apiDataForecast, setApiDataForecast] = useState({});
    const [getState, setGetState] = useState('frejus');
    const [state, setState] = useState('frejus');

    // API KEY AND URL
    const apiKey = process.env.REACT_APP_API_KEY;
    // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&units=metric&appid=${apiKey}`;

    const weather = `https://api.openweathermap.org/data/2.5/weather?q=${state}&APPID=${apiKey}&units=metric`;
    const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${state}&APPID=${apiKey}&units=metric`;

    // Side effect
    useEffect(() => {
        fetch(weather)
        .then((res) => res.json())
        .then((data) => setApiDataWeather(data));
    }, [weather]);

    useEffect(() => {
        fetch(forecast)
        .then((res) => res.json())
        .then((data) => setApiDataForecast(data));
    }, [forecast]);



    const inputHandler = (event) => {
        setGetState(event.target.value);
    };

    const submitHandler = () => {
        setState(getState);
    };

    console.log(apiDataForecast);

    return (
    <div className="App">

    <div className="container">
        <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
            <div class="col-auto">
                <label for="location-name" class="col-form-label"> Chercher Ville : </label>
            </div>
            <div class="col-auto">
                <input type="text" id="location-name" class="form-control" onChange={inputHandler} value={getState} />
                <button className="btn btn-primary mt-2" onClick={submitHandler}> Search </button>
            </div>
        </div>

        <div className="d-flex justify-content-center align-items-center">
            <h2>Now</h2>
        </div>

            <div className="todaycast">
                {apiDataWeather.main ? (
                    <div class="text-center one-cast">
                        <div className="row">
                            <img src={`http://openweathermap.org/img/w/${apiDataWeather.weather[0].icon}.png`} alt="weather status icon" className="weather-icon" />
                            <div>{apiDataWeather.main.temp}C</div>
                        </div>
                        <div className="row">
                            <strong>{apiDataWeather.weather[0].main} </strong>
                        </div>
                        <div className="row">
                            <strong>{apiDataWeather.name}, {countries.getName(apiDataWeather.sys.country, 'en', { select: 'official', })}</strong>
                        </div>

                    </div>
                    ) : (
                    <h1>Loading</h1>
                    )}
                </div>

                <h2 className="row">Forecast</h2>

                {apiDataForecast.list ? (

                    <ScrollContainer className="scroll-container forecastline" horizontal="true" hideScrollbars="true" children="div">
                        {apiDataForecast.list.map(oneday => {
                            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                            var dayName = days[new Date(oneday.dt * 1000).getDay()];
                            const time = new Date(oneday.dt * 1000).toLocaleTimeString("fr-FR",{day:'2-digit',month:'2-digit',year:'2-digit',hour: '2-digit', minute:'2-digit'});
                            return (
                            <div className="one-cast">
                                <div className="one-line">
                                    <img src={`http://openweathermap.org/img/w/${oneday.weather[0].icon}.png`} alt="weather status icon" className="weather-icon" />
                                </div>
                                <div className="one-line">
                                    {oneday.main.temp}C
                                </div>
                                <div className="one-line">
                                    {oneday.weather[0].main}
                                </div>
                                <div className="one-line">
                                    <div>{apiDataForecast.city.name},{apiDataForecast.city.country}</div>
                                </div>
                                <div className="one-line">
                                    {dayName} {time}
                                </div>
                            </div>
                            );
                        }

                        )}
                    </ScrollContainer>

                    ) : (
                    <h1>Loading</h1>
                    )}
                </div>

            </div>
            );
        }

    export default App;
