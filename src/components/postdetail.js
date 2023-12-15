import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import './search.css';

const postdetail = async (objectID) => {
  const response = await fetch(`http://hn.algolia.com/api/v1/items/${objectID}`);
  const data = response.json();
  return data;
}



const PostDetails = () => {
  const [postDetails, setPostDetails] = useState([]);
  
  const post = async (objectID) => {
    const data = await postdetail(objectID);
    setPostDetails(data);
  }
  const { objectID } = useParams();

  useEffect(() => {
    post(objectID);
  }, [objectID]);

  return <div>
    
    <h2>{postDetails.title}</h2>
    <div className="line">
    <div>Points: {postDetails.points}</div> by <div >{postDetails.author}</div>
    </div>

  </div>
}
export default PostDetails;