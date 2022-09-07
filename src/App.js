import React, { useState } from 'react';
import logo from '/Users/parthpatel/Documents/weather-react/src/assets/weather.gif';
import Modal from './Modal';

const api = {
  key:"6e8e22fc70b7abd0c868e0b3d8f59b2c",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [openModal, setOpenModal] = useState(false);
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)});
        setQuery(' ');
    }
  }


    const dateBuilder = (d) => {
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`
    }

  return (
    <div className={(typeof weather.main != "undefined")
    ? ((weather.main.temp > 16)
    ? 'app warm'
    : "app")
    : 'app'}>
      <main>
      
        <div className="logoHeading">
        <img src={logo} alt='Logo' />
        </div>
        <div className="search-box">
          <input
          type="text"
          className="search-bar"
          placeholder="Search.."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {/* <div className="popBtn">
          <button onClick={() => setOpenModal(true)}>Information</button>
          <Modal open={openModal}/>
        </div> */}
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <table>
                <tr>
                  <th>
                      <div className="weather-box">
                        <div className="temp">
                          <div className="temp-min">{Math.round(weather.main.temp_min)}°c </div>
                            {Math.round(weather.main.temp)}°c 
                          <div className="temp-max">{Math.round(weather.main.temp_max)}°c </div>
                        </div>
                    </div>
                  </th>
                  <th>
                      <div className="weather-box">
                        <div className="temp">
                          <div className="temp-min">{Math.round(weather.main.temp_min * 9 / 5 + 32)}°F </div>
                          {Math.round(weather.main.temp * 9 / 5 + 32)}°F
                          <div className="temp-max">{Math.round(weather.main.temp_max * 9 / 5 + 32)}°F</div>
                        </div>
                    </div>
                  </th>
                </tr>  
              </table>
              <div className="weather-box humidity">
                  Humidity: {weather.main.humidity}%
              </div>
              <div className="weather">
                  {weather.description}
              </div>
          </div>
        ) : ('')}
        
      </main>
    </div>
  );
}

export default App;
