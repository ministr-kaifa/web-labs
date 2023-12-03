import {useState} from 'react'
function PostForm({createPost}) {

  const [pseudoId, setPseudoId] = useState(6);
  const [newPost, setNewPost] = useState({author : '', content : ''})  

  function addNewPost(e) {
    e.preventDefault()
    setPseudoId(pseudoId + 1)
    createPost({...newPost, id : pseudoId})
    setNewPost({author : '', content : ''})
  }    

  return (
    <form>
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
      <button onClick={e => addNewPost(e)}>Добавить</button>
    </form>
  );
}
export default PostForm;