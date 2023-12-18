import { Link } from 'react-router-dom'

const Notfoundpage = () => {
  return (
    <div>
      Страница не найдена. <Link to="/">Домой</Link>
    </div>
  )
}

export { Notfoundpage };