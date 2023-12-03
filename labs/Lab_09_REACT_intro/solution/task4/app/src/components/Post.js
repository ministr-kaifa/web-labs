import {useState} from 'react'

function Post({tagFilter, changeTagFilter, removePost, post}) {

  let [liked, setLiked] = useState(post.liked);

  return (
    <div className="Post">
      <p>{post.author}</p>
      <p>{post.content}</p>
      <button 
        value={post.tag}
        className={tagFilter.includingFilter === post.tag && tagFilter.enabled? "selectedTagFilter" : "unselectedTagFilter"}
        onClick={e => changeTagFilter(e)}
      >{"#" + post.tag}</button>
      <button className={liked? "likedButton" : "notLikedButton"} onClick={() => setLiked(!liked)}>like post</button>
      <button className="deleteButton" onClick={e => removePost(post)}>delete post</button>
    </div>
  );
}
export default Post;
