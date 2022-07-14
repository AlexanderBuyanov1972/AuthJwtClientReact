import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context, TypeRootStore } from '.';
import localStorageService from './services/LocalStorageService';
import LoginForm from './form/LoginForm'

const App: React.FC = () => {
  const {authStore}: TypeRootStore = useContext(Context)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    let email = localStorageService.getEmail()
    if (email.length > 7)
    authStore.check(email).finally(() => setLoading(false))
    setLoading(false);
  }, [])

  if (loading)
    return <div>
      <h1>LOADING...</h1>
    </div>
  return (
    <div className="App">
      <h1>{authStore.isRegistered ? "User is registered" : "User is not registered"}</h1>
      <h1>{authStore.isLogin ? "User is authorized " : "User is not authorized"}</h1>
      <h1>{authStore.isAdmin ? "User is admin" : "User is not admin"}</h1>
      <h1>{authStore.error ? authStore.error : "Not errors"}</h1>
      <LoginForm />
    </div>
  );
}

export default observer(App); 
