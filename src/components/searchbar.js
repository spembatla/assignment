
import React, { useState, useEffect } from "react";
import { Autocomplete, Input, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

import "./search.css";

const searchHN = async (query) => {
  const response = await fetch(
    `http://hn.algolia.com/api/v1/search?query=${query}`
  );
  const data = await response.json();
  return data.hits;
};

const SearchHN = () => {
  const top100Films = [];

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);


  const search = async () => {
    const data = await searchHN(query);
    setResults(data);
  };

  useEffect(() => {
    search();
  }, []);

  useEffect(() => {
    if(query){
      search();
    }
  }, [query, search]);



  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
  }





  return (
    <div className="search">
      <Autocomplete
        id="search-id"
        freeSolo
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => <Input {...params} onChange={handleSearch} placeholder="Type here to Search" label="Search" startAdornment={<InputAdornment position="start">
          <Search />
        </InputAdornment>} />}
      />

      <ul className="items">
        {results && results.map((result, index) => {
          return <li className="item" key={result.objectID} >
            <a href={`/post/${result.objectID}`}>{result.title}</a></li>
        })}
      </ul>
    </div>
  );
};

export default SearchHN;
