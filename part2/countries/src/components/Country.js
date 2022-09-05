const Country = ({ country, show, clickHandler }) => {
    return (<p>
        {country.name.common}
        <button onClick={clickHandler(country, show)}>show</button >
    </p>)
}

export default Country