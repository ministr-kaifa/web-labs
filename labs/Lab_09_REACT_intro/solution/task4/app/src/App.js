import PostForm from './components/PostForm';
import PostList from './components/PostList'
import './styles/App.css'
import {useState} from 'react'
import TagsContext from './context';

function App() {

  
  const [posts, setPosts] = useState([
      {id : 1,  author : "Author1",   content : "First post content",        liked : false,  tag : "music"},
      {id : 2,  author : "Author2",   content : "Second post content",       liked : false,  tag : "vkfest"},
      {id : 3,  author : "Author3",   content : "Yet another post content",  liked : true,   tag : "vkfest"},
      {id : 4,  author : "Author4",   content : "Yet another post content",  liked : false,  tag : "music"},
      {id : 5,  author : "Author5",   content : "Yet another post content",  liked : false,  tag : "vkfest"}
  ])

  const [tags, setTags] = useState(toUniqueTags(posts))

  function toUniqueTags(posts) {
    return [...new Set(posts.map(post => post.tag))]
  }

  function createPost(newPost) {
    setPosts([...posts, newPost])
    setTags([...new Set([...tags, newPost.tag])])
  }

  function removePost(targetPost) {
    setPosts(posts.filter(post => post.id !== targetPost.id))
    if(posts.filter(post => post.tag === targetPost.tag).length === 1) {
      setTags(tags.filter(tag => tag !== targetPost.tag))
    }
  }

  return (
    <TagsContext.Provider value={{
      tags,
      setTags
    }}>
      <div className="App">
        <PostForm createPost={createPost} />
        <PostList removePost={removePost} posts={posts} />
      </div>
    </TagsContext.Provider>
  );
}

export default App;
