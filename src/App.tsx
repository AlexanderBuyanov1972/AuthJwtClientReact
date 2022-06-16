import React, { FC, useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import LocalStorageService from './services/LocalStorageService';
import LoginForm from './form/LoginForm'

const App: FC = () => {
  const { store } = useContext(Context)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const id = LocalStorageService.getId();
    id ? store.check(id).then(res => setLoading(false)) : setLoading(false)
  }, [])

  if (loading)
    return <div>
      <h1>LOADING...</h1>
    </div>
  return (
    <div className="App">
      <h1>{store.isRegistered ? "User is registered" : "User is not registered"}</h1>
      <h1>{store.isAuthorized ? "User is authorized " : "User is not authorized"}</h1>
      <h1>{store.user.isActivated ? "User is activated" : "Activate your account"}</h1>
      <LoginForm />
    </div>
  );
}

export default observer(App); 
