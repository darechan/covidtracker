import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select } from '@material-ui/core';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['worldwide']);
  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso3, //FR AFG IN
              flag: country.countryInfo.flag
            }
          ));

          setCountries(countries);
        });
    }

    getCountries();
  }, []);

  const onCountryChange = async(event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  }
  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 Dashboard</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
           <MenuItem value="worldwide">WorldWide</MenuItem>
            {countries.map(country => (
              <MenuItem value={country.value}><img src={country.flag} width="25px" height="15px"></img> {country.name} </MenuItem>
            ))}
            {/*
            <MenuItem value="worldwide">Option 2</MenuItem>
            <MenuItem value="worldwide">Option 3</MenuItem> */}
          </Select>
        </FormControl>
      </div>
      <div className="app__stats"></div>
    </div>
  );
}

export default App;
