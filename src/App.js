import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select } from '@material-ui/core';
import Cards from "./components/Cards/Cards";
import Table from "./components/Table/Table";
import Graph from "./components/Graph/Graph";
import './App.css';
import { sortData } from "./utilities/util";
//Material UI
import { Card, CardContent, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['worldwide']);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      });
  }, [])
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
          const sortedData = sortData(data);

          setCountries(countries);
          setTableData(sortedData);
        });
    }

    getCountries();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    const url = countryCode === "worldwide" ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data)
      })
  }
  console.log(countryInfo);
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Dashboard</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {countries.map(country => (
                <MenuItem value={country.value}><img src={country.flag} width="25px" height="15px"></img> <span className="country__name">{country.name}</span> </MenuItem>
              ))}
              {/*
            <MenuItem value="worldwide">Option 2</MenuItem>
            <MenuItem value="worldwide">Option 3</MenuItem> */}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Cards className="infected" title="Total Cases" cases={countryInfo.todayCases} total={countryInfo.cases}></Cards>
            </Grid>
            <Grid item md={6} xs={12}>
              <Cards className="recovered" title="Recovered Cases" cases={countryInfo.todayRecovered} total={countryInfo.recovered}></Cards>
            </Grid>
            <Grid item md={6} xs={12}>
              <Cards className="deaths" title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}></Cards>
            </Grid>
            <Grid item md={6} xs={12}>
              <Cards className="active" title="Active Cases" cases={countryInfo.active} total={countryInfo.active}></Cards>
            </Grid>
          </Grid>


        </div>
        <div className="graph__container">
          <h3>Worldwide new {casesType}</h3>
          <Graph casesType={casesType} />
        </div>
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            <div className="app__information">
              <h3>Live Cases by Country</h3>
              <Table countries={tableData} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
