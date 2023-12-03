import './App.css';
import {useState} from 'react'

function App() {
  const [count, changeCount] = useState(0)
  return (
    <div className="App">
      {<p>{count}</p>}
      {<button onClick={() => changeCount(count + 1)}>+1</button>}
      {<button onClick={() => changeCount(count - 1)}>-1</button>}
    </div>
  );
}

export default App;
