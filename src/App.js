
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SearchHN from "./components/searchbar";
import PostDetails from "./components/postdetail";

const App = () => {
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={<SearchHN/>}
          />
          <Route path="/post/:objectID" element={<PostDetails/>} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
