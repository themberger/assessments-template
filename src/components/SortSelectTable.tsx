import React, { useState, useEffect, ChangeEvent } from 'react';

import { Country } from '../interfaces/Country';

import { sortCompare } from '../utils/sortCompare';

function SortSelectTable(props: {countryData: []}) {
    const [ filteredData, setFilteredData ] = useState<[]>(props.countryData);
    const [ selectedCountry, setSelectedCountry ] = 
        useState<Country>({
            name: '',
            alpha3Code: '', 
            capital: '', 
            population: null,
            languages: [{name: ''}],
            currencies: [{code: ''}],
        });
    const [ sortClass, setSortClass ] = useState<string>('ascending');
    const [ countryFilterVal, setCountryFilterVal ] = useState<string>('');

    const toggleSort = (): void => {
        if (sortClass === 'ascending') {
            setSortClass('descending');
        } else if (sortClass === 'descending') {
            setSortClass('ascending');
        }
    };

    // SET THE FILTER VALUE IN STATE [setCountryFilterVal]
    const handleFilter = (e: ChangeEvent<HTMLInputElement>): void => {
        console.log(e.target.value);
        setCountryFilterVal(e.target.value);
    };

    // SET THE INTIAL DATA SET FROM PROPS
    useEffect(() => {
        setFilteredData(props.countryData);
    }, [props.countryData]);

    // SORT THE DATA BY POPULATION ... A STRANGE BUG IS OCCURING HERE WITH STATE WHEN SETTING SELECTED COUNTRY [setSelectedCountry]
    useEffect(() => {
        filteredData.sort(sortCompare('population', sortClass));
    }, [sortClass, filteredData]);

    // FILTER RESULTS FOR COUNTRY AND CODE WITH INPUT VALUE
    useEffect(() => {
        if (countryFilterVal !== '' && countryFilterVal !== undefined) {
            const newData = [...props.countryData];
            const results: any = newData.filter((rec: Country) => {
                if ((rec.name.toLowerCase() !== countryFilterVal.toLowerCase() && !rec.name.toLowerCase().includes(countryFilterVal.toLowerCase())) && (rec.alpha3Code.toLowerCase() !== countryFilterVal.toLowerCase() && !rec.alpha3Code.toLowerCase().includes(countryFilterVal.toLowerCase()))) {
                    return false;
                } else {
                    return true;
                }
            });
            setFilteredData(results);
        } else {
            setFilteredData(props.countryData);
        }
    }, [countryFilterVal, props.countryData]);
    
    return (
        <div>
            <div className="ui transparent icon input">
                <input type="text" placeholder="Search..." onChange={(e: ChangeEvent<HTMLInputElement>) => handleFilter(e)} />
                <i className="search icon"></i>
            </div>
            <div className="ui two column centered grid main-container">
                <div className="table-container">
                    <table className="ui very basic sortable selectable table">
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th>Code</th>
                                <th>Capital</th>
                                <th className={`sorted ${sortClass}`} onClick={toggleSort}>Population</th>
                            </tr>
                        </thead>
                        <tbody>
                        { filteredData.length > 0 && 
                            filteredData.map(({name, alpha3Code, capital, population, languages, currencies}, index: number) =>
                                <tr key={index} onClick={() => setSelectedCountry({name, alpha3Code, capital, population, languages, currencies})}>
                                    <td>{name}</td>
                                    <td>{alpha3Code}</td>
                                    <td>{capital}</td>
                                    <td>{population}</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
                <div className="ui right floated details-container">
                    <div className="ui list">
                        {selectedCountry.name === '' && <div>Click For Details...</div>}
                        {selectedCountry.name !== '' && 
                            <div className="item">
                                <div className="header">Country Name</div>
                                {selectedCountry.name}
                            </div>
                        }
                        {selectedCountry.capital !== '' && 
                            <div className="item">
                                <div className="header">Capital</div>
                                {selectedCountry.capital}
                            </div>
                        }
                        {selectedCountry.population !== null && 
                            <div className="item">
                                <div className="header">Population</div>
                                {selectedCountry.population}
                            </div>
                        }
                        {selectedCountry.languages[0].name !== '' && 
                            <div className="item">
                            <div className="header">Language(s)</div>
                                {selectedCountry.languages.map(({name}, index) => 
                                    <div key={index}>{name}</div>
                                )}
                            </div>
                        }
                        {selectedCountry.currencies[0].code !== '' && 
                            <div className="item">
                            <div className="header">Currencies</div>
                                {selectedCountry.currencies.map(({code}, index) => 
                                    <div key={index}>{code}</div>
                                )}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SortSelectTable;