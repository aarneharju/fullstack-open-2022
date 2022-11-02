import { useEffect } from "react";
import ButtonShow from "./ButtonShow";

const Countries = (props) => {

    console.log('weather', props.selectedCountryWeather);

    // Conditional rendering
    if (props.shownCountriesArray.length === 1) {

        const selectedCountry = props.shownCountriesArray[0];
        const languagesArray = Object.values(selectedCountry.languages).map(language => <li key={language}>{language}</li>);
        const flagImageUrl = selectedCountry.flags.png;
        const weatherIconUrl = 'https://openweathermap.org/img/wn/' + props.selectedCountryWeather.weather[0].icon + '@2x.png';

        return (
            <div>
                <h2>{selectedCountry.name.common}</h2>
                <p>Capital: {selectedCountry.capital}</p>
                <p>Area: {selectedCountry.area}</p>
                <p>Languages:</p>
                <ul>
                    {languagesArray}
                </ul>
                <img src={flagImageUrl} />
                <h3>Weather in {selectedCountry.capital}</h3>
                <p>Temperature: {props.selectedCountryWeather.main.temp} Celsius</p>
                <img src={weatherIconUrl} alt='Weather icon' />
                <p>Wind: {props.selectedCountryWeather.wind.speed} m/s</p>
            </div>
        )
    }

    if (props.shownCountriesArray.length > 1 && props.shownCountriesArray.length <= 10) {

        const selectedCountriesNamesAsListItems = props.shownCountriesArray.map(country => <li key={country.name.common}>{country.name.common} <ButtonShow country={country} shownCountriesArray={props.shownCountriesArray} handleClick={props.handleClick} text='Show' /></li>)

        return (
            <ul>
                {selectedCountriesNamesAsListItems}
            </ul>
        )

    } else {
        return (
            <p>Too many matches, refine your filter.</p>
        )
    }
}

export default Countries;