import React, { FC, useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import localStorageService from './services/LocalStorageService';
import LoginForm from './form/LoginForm'

const App = () => {
  const { store } = useContext(Context)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    let email = localStorageService.getEmail()
    if (email.length > 7)
      store.check(email).finally(() => setLoading(false))
    setLoading(false);
  }, [])

  if (loading)
    return <div>
      <h1>LOADING...</h1>
    </div>
  return (
    <div className="App">
      <h1>{store.isRegistered ? "User is registered" : "User is not registered"}</h1>
      <h1>{store.isLogin ? "User is authorized " : "User is not authorized"}</h1>
      <h1>{store.user.isActivated ? "User is activated" : "Activate your account"}</h1>
      <LoginForm />
    </div>
  );
}

export default observer(App); 
