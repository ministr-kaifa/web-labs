import { Routes, Route, Link } from 'react-router-dom';
import { Userpage } from './Userpage'

const Homepage = ({users}) => {
  return (
    <div>
      <ul> {
          users.map(user => 
            <Link to={"users/" + user.id}>{user.name}</Link>)
        }
      </ul>
      <Routes>
        <Route 
          path={'/users/:id'} 
          element= {
            <Userpage 
              user={users.find(user => user.id === params.id)}
            />
          }
        />
      </Routes>
    </div>
  )
}

export { Homepage };