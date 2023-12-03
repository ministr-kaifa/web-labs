import Post from './components/Post'
import './styles/App.css'

function App() {
  return (
    <div className="App">
      <ul>
        <Post post={{author : "Author1", content : "First post content", liked : false}}></Post>
        <Post post={{author : "Author2", content : "Second post content", liked : false}}></Post>
        <Post post={{author : "Author3", content : "Yet another post content", liked : true}}></Post>
        <Post post={{author : "Author4", content : "Yet another post content", liked : false}}></Post>
        <Post post={{author : "Author5", content : "Yet another post content", liked : false}}></Post>
        <Post post={{author : "Author6", content : "Yet another post content", liked : true}}></Post>
      </ul>
    </div>
  );
}

export default App;
