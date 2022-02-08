import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '.';
import LoginForm from './components/login-form/LoginForm';
import { IUser } from './models/IUser';
import UserService from './services/UserService';

const App: FC = () => {
  const { store } = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])
  useEffect(() => {
    if (localStorage.getItem('token'))
      store.checkAuth()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
      console.log(users)
    } catch (error) {
      console.log(error)
    }

  }

  if (store.isLoading)
    return <div>
      <h1>LOADING...</h1>
    </div>
  return (
    <div className="App">
      <h1>{store.isAuth ? `User is authorized ${store.user.email}` : "User is not authorized"}</h1>
      <h1>{store.user.isActivated ? `User is activated by ${store.user.email}` : "Активируйте аккаунт"}</h1>
      <LoginForm />
      <div>
        <button onClick={fetchUsers}>List users</button>
      </div>
      {users.map(user =>
        <div key={user.email}><h1>email: {user.email}</h1></div>
      )}
    </div>
  );
}

export default observer(App); 
