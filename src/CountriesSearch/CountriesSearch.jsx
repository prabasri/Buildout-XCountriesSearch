import React, { useEffect, useState } from "react";
import './CountriesSearch.css';
import axios from "axios";

export const CountriesSearch = () => {

  const [searchValue, setSearchValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [timer, setTimer] = useState(null);

  const getCountries = async() => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data);
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if(!searchValue.length) {
      getCountries();
    } else {
      setCountries(countries.filter((country) => country.name.common.toLowerCase().includes(searchValue.toLowerCase())));
    }
  }, [searchValue]);

  console.log(countries);
  console.log(searchValue);

  // const handleSearch = (e, debounceTimeout) => {

  //   // setSearchValue(e.target.value);   // we must not do the state change here, because filtering may take some time and leads to delay in state update i.e., updates the search value one value behind. Eg: When we search --> india --> indi will be in searcValue.
    
  //   if(timer !== 0) {
  //     clearTimeout();
  //   }

  //   let newTimer = setTimeout(() => {
  //     if(searchValue.length-1) {
  //       const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(searchValue.toLowerCase()));
  //       setCountries(filteredCountries);
  //     } else {
  //       getCountries();
  //     }
  //   }, debounceTimeout);
    
  //   setTimer(newTimer);
  // }

  useEffect(() => {
    setSearchValue(searchValue);
  }, [searchValue]);

  const handleSearch =() => {
    
  }

  return (
    <div>
      <div className="navbar">
        <input 
          value={searchValue} 
          onChange={e => setSearchValue(e.target.value)} 
          placeholder="Search for countries..."
        />
      </div>
      <div className="cards-grid">
        {searchValue.length ? 
          (countries.length ?
            (countries.map((country) => {
              console.log("Entered", countries.length);
              return (
              <div className="countryCard" key={country.name.common}>
                <img src={country.flags.png} alt={country.flags.alt} width={90} height={80}/>
                <p className="countryName">{country.name.common}</p>
              </div>
              )
            })) : null) :
            countries.map((country) => {
              return (
              <div className="countryCard" key={country.name.common}>
                <img src={country.flags.png} alt={country.flags.alt} width={90} height={80}/>
                <p className="countryName">{country.name.common}</p>
              </div>
              );
            })
        }
      </div>
    </div>
  )
}