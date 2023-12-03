import PostForm from './components/PostForm';
import PostList from './components/PostList'
import './styles/App.css'
import {useState} from 'react'

function App() {

  const [posts, setPosts] = useState([
      {id : 1, author : "Author1", content : "First post content", liked : false},
      {id : 2, author : "Autor2", content : "Second post content", liked : false},
      {id : 3, author : "Author3", content : "Yet another post content", liked : true},
      {id : 4, author : "Author4", content : "Yet another post content", liked : false},
      {id : 5, author : "Author5", content : "Yet another post content", liked : false}
  ])

  function createPost(newPost) {
    setPosts([...posts, newPost])
  }

  function removePost(targetPost) {
    setPosts(posts.filter(post => post.id !== targetPost.id))
  }

  return (
    <div className="App">
        <PostForm createPost={createPost}/>
        <PostList removePost={removePost} posts={posts}/>
    </div>
  );
}

export default App;
