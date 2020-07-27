import React, { useState } from 'react';
import { MenuItem, FormControl, Select } from '@material-ui/core';
import './App.css';

function App() {
  const [countries, setCountries] = useState(["USA", "UK", "France"]);
  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 Dashboard</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="avc">
            {countries.map(country => (
              <MenuItem value={country}> {country} </MenuItem>
            ))}
            <MenuItem value="worldwide">WorldWide</MenuItem>
            <MenuItem value="worldwide">Option 2</MenuItem>
            <MenuItem value="worldwide">Option 3</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
