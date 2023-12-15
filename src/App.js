import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postDetails, setPostDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
       const response = await axios.get(
         `http://hn.algolia.com/api/v1/search?query=${query}`
       );
       setSearchResults(response.data.hits);
    } catch (error) {
       console.error(error);
    } finally {
       setIsLoading(false);
    }
   };
   
   const handlePostDetails = async (objectID) => {
    setIsLoading(true);
    try {
       const response = await axios.get(
         `http://hn.algolia.com/api/v1/items/${objectID}`
       );
       setPostDetails(response.data);
    } catch (error) {
       console.error(error);
    } finally {
       setIsLoading(false);
    }
   };
   
   useEffect(() => {
    if (searchResults.length > 0) {
       handlePostDetails(searchResults[0].objectID);
    }
   }, [searchResults]);

  return (
    <Router>
      <div className="App">
        
        <Routes
          exact
          path="/"
          render={() => (
            <div>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  className="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
              </form>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <ul className="box">
                  {searchResults.map((result) => (
                    <li
                      key={result.objectID}
                      onClick={() => handlePostDetails(result.objectID)}
                    >
                      {result.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        />
        <Routes
          path="/post/:objectID"
          render={() => (
            <div>
              <button >Back to search</button>
              <h1>{postDetails.title}</h1>
              <p>Points: {postDetails.points}</p>
              <ul>
                {postDetails.children.map((comment) => (
                  <li key={comment.id}>{comment.text}</li>
                ))}
              </ul>
            </div>
          )}
        />
      </div>
    </Router>
  );
};

export default App;
