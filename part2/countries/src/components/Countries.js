import ButtonShow from "./ButtonShow";

const Countries = (props) => {

    // Conditional rendering
    if (props.shownCountriesArray.length === 1) {

        const languagesArray = Object.values(props.shownCountriesArray[0].languages).map(language => <li key={language}>{language}</li>);
        const flagImageUrl = props.shownCountriesArray[0].flags.png;


        return (
            <div>
                <h2>{props.shownCountriesArray[0].name.common}</h2>
                <p>Capital: {props.shownCountriesArray[0].capital}</p>
                <p>Area: {props.shownCountriesArray[0].area}</p>
                <p>Languages:</p>
                <ul>
                    {languagesArray}
                </ul>
                <img src={flagImageUrl} />
            </div>
        )
    }

    if (props.shownCountriesArray.length > 1 && props.shownCountriesArray.length <= 10) {

        const selectedCountriesNamesAsListItems = props.shownCountriesArray.map(country => <li key={country.name.common}>{country.name.common} <ButtonShow country={country} shownCountriesArray={props.shownCountriesArray} handleClick={props.handleClick} text='Show' /></li>)

        // const selectedCountriesNamesAsListItems = props.shownCountriesArray.map(country => <li key={country.name.common}>{country.name.common} <button onClick={() => handleClick(country)}>ShowIt</button></li>)

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