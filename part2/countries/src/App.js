import './App.css';
import { useState, useEffect } from 'react';
import Countries from './components/Countries';

function App() {


  // Set states
  const [controlledSearch, setControlledSearch] = useState('');
  const [shownCountriesArray, setShownCountriesArray] = useState([]);
  const [countriesArray, setCountriesArray] = useState([]);

  // Set variables
  const endpoint = 'https://restcountries.com/v3.1/all';

  // Effects
  useEffect(() => {
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        setCountriesArray(data);
        return;
      });
  }, [])

  // Functions
  const handleSearch = (event) => {
    const inputBoxContents = event.target.value;
    setControlledSearch(inputBoxContents);
    setShownCountriesArray(countriesArray.filter(country => country.name.common.toLowerCase().includes(inputBoxContents.toLowerCase())));//.map(country => <li key={country.name.common}>{country.name.common}</li>));
  }

  const handleClick = (country) => {
    console.log(country.name.common);
    setShownCountriesArray([country]);
    console.log({ shownCountriesArray });
  }

  // Render
  return (
    <div className="App">
      <h1>Countries</h1>
      <label htmlFor='search'>Find countries:</label>
      <input type='text' name='search' id='search' value={controlledSearch} onChange={handleSearch} />
      <Countries shownCountriesArray={shownCountriesArray} handleClick={handleClick} controlledSearch={controlledSearch} countriesArray={countriesArray} />
    </div>
  );
}

export default App;
