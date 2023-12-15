import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SearchHN from "./components/searchbar";
import PostDetails from "./components/postdetail";

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
        <Routes>
          <Route
            exact
            path="/"
            element={<SearchHN/>}
          />
          <Route path="/srikanth/:id" element={<PostDetails/>} />
          <Route
            path="/post/:objectID"
            element={() => (
              <div>
                <button>Back to search</button>
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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
