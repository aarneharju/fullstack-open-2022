import './App.css';
import { useState, useEffect } from 'react';
import Countries from './components/Countries';

function App() {


  // Set states
  const [controlledSearch, setControlledSearch] = useState('');
  const [shownCountriesArray, setShownCountriesArray] = useState([]);
  const [countriesArray, setCountriesArray] = useState([]);
  const [selectedCountryWeather, setSelectedCountryWeather] = useState({});

  // Set variables
  const endpoint = 'https://restcountries.com/v3.1/all';
  const openweather_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
  const openweatherAPIendpoint = 'https://api.openweathermap.org/data/2.5/weather?';

  // Effects
  useEffect(() => {
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        setCountriesArray(data);
        return;
      });
  }, [])

  useEffect(() => {
    if (shownCountriesArray.length === 1) {

      const openweatherFullFetchUrl = openweatherAPIendpoint + 'lat=' + shownCountriesArray[0].capitalInfo.latlng[0] + '&lon=' + shownCountriesArray[0].capitalInfo.latlng[1] + '&appid=' + openweather_API_KEY + '&units=metric';

      fetch(openweatherFullFetchUrl)
        .then(result => result.json())
        .then(data => {
          setSelectedCountryWeather(selectedCountryWeather => {
            return {
              ...selectedCountryWeather,
              ...data
            }
          });
        });
    }
  }, [shownCountriesArray])

  // Functions
  const handleSearch = (event) => {
    const inputBoxContents = event.target.value;
    setControlledSearch(inputBoxContents);
    setShownCountriesArray(countriesArray.filter(country => country.name.common.toLowerCase().includes(inputBoxContents.toLowerCase())));
  }

  const handleClick = (country) => {
    setShownCountriesArray([country]);
  }

  // Render
  return (
    <div className="App">
      <h1>Countries</h1>
      <label htmlFor='search'>Find countries:</label>
      <input type='text' name='search' id='search' value={controlledSearch} onChange={handleSearch} />
      <Countries shownCountriesArray={shownCountriesArray} handleClick={handleClick} controlledSearch={controlledSearch} countriesArray={countriesArray} selectedCountryWeather={selectedCountryWeather} />
    </div>
  );
}

export default App;
