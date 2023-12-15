import { useParams } from "react-router-dom";

const PostDetails = () => {
    const params = useParams();
    console.log('params ==> ', params);

    return <div>post details</div>
}

export default PostDetails;