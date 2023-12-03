import Post from './Post'
import {useContext, useState} from 'react'
import TagsContext from '../context';

function PostList({removePost, posts}) {

  const {tags, setTags} = useContext(TagsContext)
  const [tagFilter, setTagFilter] = useState(
    {
      enabled: false,
      includingFilter: ''
    }
  )


  function changeTagFilter(e) {
    e.preventDefault()
    setTagFilter({includingFilter: e.target.value, enabled: !tagFilter.enabled || tagFilter.includingFilter !== e.target.value})
  }    
    
  return (
    <div className="PostList">
      <p>Тэги:</p>
      <ul> {
          tags.map(tag => 
            <button 
              value={tag}
              key={tag}
              className={tagFilter.enabled && tagFilter.includingFilter === tag? "selectedTagFilter" : "unselectedTagFilter"}
              onClick={e => changeTagFilter(e)}
            >{"#" + tag}</button>
        )}
      </ul>
      <p>Посты:</p>
      <ul> {
        posts.filter(post => !tagFilter.enabled || tagFilter.includingFilter === post.tag).map(post =>
            <Post tagFilter={tagFilter} changeTagFilter={changeTagFilter} removePost={removePost} post={post} key={post.id}/>
        )}
      </ul>
    </div>
  );
}
export default PostList;
