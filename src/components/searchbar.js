import React, { useState, useEffect } from "react";
import "./search.css";

const searchHN = async (query) => {
  const response = await fetch(
    `http://hn.algolia.com/api/v1/search?query=${query}`
  );
  const data = await response.json();
  return data.hits;
};

const SearchHN = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = async () => {
    const data = await searchHN(query);
    setResults(data);
  };

  useEffect(() => {
    if (query) {
      search();
    }
  }, [query]);

  return (
    <div className="search">
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={search}>Search</button>
      </div>
      <div>
        <ul className="box">
          {results.map((result) => (
            <li key={result.objectID}>
              <a href={result.url}>{result.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchHN;
