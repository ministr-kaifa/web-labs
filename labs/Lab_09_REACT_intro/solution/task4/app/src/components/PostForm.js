import {useState} from 'react'
function PostForm({createPost}) {

  const [pseudoId, setPseudoId] = useState(6);
  const [newPost, setNewPost] = useState({author : '', content : '', tag : ''})  

  function addNewPost(e) {
    e.preventDefault()
    setPseudoId(pseudoId + 1)
    createPost({...newPost, id : pseudoId})
    setNewPost({author : '', content : '', tag : ''})
  }    

  return (
    <form>
      <p>Создать пост:</p>
      <input 
        value={newPost.author}
        onChange={e => setNewPost({...newPost, author : e.target.value})}
        placeholder="username" 
        type="text" />
      <input 
        value={newPost.content}
        onChange={e => setNewPost({...newPost, content : e.target.value})}
        placeholder="post text" 
        type="text" />
      <input 
        value={newPost.tag}
        onChange={e => setNewPost({...newPost, tag : e.target.value})}
        placeholder="tag" 
        type="text" />
      <button onClick={e => addNewPost(e)}>Добавить</button>
    </form>
  );
}
export default PostForm;