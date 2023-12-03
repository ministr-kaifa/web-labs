import {useState} from 'react'

function Post({removePost, post}) {

  let [liked, setLiked] = useState(post.liked);

  return (
    <div className="Post">
      <p>{post.author}</p>
      <p>{post.content}</p>
      <button className={liked? "likedButton" : "notLikedButton"} onClick={() => setLiked(!liked)}>like post</button>
      <button onClick={e => removePost(post)}>delete post</button>
    </div>
  );
}
export default Post;
