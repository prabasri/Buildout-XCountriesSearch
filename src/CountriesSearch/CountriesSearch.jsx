import React, { useEffect, useState } from "react";
import './CountriesSearch.css';
import axios from "axios";

export const CountriesSearch = () => {

  const [searchValue, setSearchValue] = useState("");
  const [countries, setCountries] = useState([]);

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
  
  // There are a few reasons why the search value might be updating one value behind in React. One possibility is that the state update is being deferred until after the function that updates the state has finished executing. This can happen if the state update is called asynchronously. For example, if the state update is called inside a callback function, it will not be executed until the callback function has finished executing.

  // To fix this, you can try using the useEffect hook. The useEffect hook allows you to run code after the component has rendered. This means that you can use the useEffect hook to update the state after the component has rendered, ensuring that the state is always up-to-date.

  return (
    <div>
      <div className="navbar">
        <input 
          type="text"
          value={searchValue} 
          onChange={e => setSearchValue(e.target.value)} 
          placeholder="Search for countries..."
        />
      </div>
      <div className="cards-grid">
        {searchValue.length ? 
          (countries.length ?
            countries.map((country) => {
              // console.log("Entered", countries.length);
              return (
              <div className="countryCard" key={country.name.common}>
                <img src={country.flags.png} alt={country.flags.alt} width={90} height={80}/>
                <p className="countryName">{country.name.common}</p>
              </div>
              )
            }) : null) :
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