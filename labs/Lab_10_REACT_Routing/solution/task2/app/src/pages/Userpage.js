const Userpage = ({user}) => {
  return (
    <div>
      <p>id: {user.id}</p>
      <p>username: {user.name}</p>
    </div>
  )
}

export { Userpage };