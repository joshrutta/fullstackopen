import Weather from './Weather'

const CountryDetail = ({ country, show, clickHandler }) => {

    const countryName = country.name.common
    const [lat, lng] = country.latlng

    return (
        <div>
            <h1>{countryName}</h1>
            <button onClick={clickHandler(country, show)}>hide</button >
            <p>capital {country.capital[0]}</p>
            <div>
                <b>languages</b>
                <ul>
                    {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
                </ul>
                <img src={country.flags.png} alt={`${countryName} flag`} />
                <Weather lat={lat} lng={lng} countryName={countryName} />
            </div>
        </div>
    )
};

export default CountryDetail;