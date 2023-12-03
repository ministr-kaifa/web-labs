import {useState} from 'react'

function Post(props) {

  let [liked, setLiked] = useState(props.post.liked);

  return (
    <div className="Post">
      <p>{props.post.author}</p>
      <p>{props.post.content}</p>
      <button className={liked? "likedButton" : "notLikedButton"} onClick={() => setLiked(!liked)}>like post</button>
    </div>
  );
}

export default Post;
