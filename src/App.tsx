import React, { useEffect, useState } from 'react';
import { http } from './utils/requestHandler';

import SortSelectTable from './components/SortSelectTable';

import './App.css'

function App() {
  const [ countryData, setCountryData ] = useState<[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await http<[]>(
          'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;alpha3Code;capital;population;languages;currencies'
        );
        setCountryData(responseData);
      } catch (err) {}
    };
    fetchData();
  }, []);

  return (
    <div>
      <SortSelectTable countryData={countryData} />
    </div>
  );
}

export default App;