import Post from './Post'

function PostList({removePost, posts}) {
    
  return (
    <div className="PostList">
      <ul>
        {posts.map(post =>
            <Post removePost={removePost} post={post} key={post.id}/>
        )}
      </ul>
    </div>
  );
}
export default PostList;
