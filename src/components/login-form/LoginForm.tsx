import React, { FC, useContext, useEffect, useState } from "react";
import './LoginForm.module.css'
import { Context } from "../..";
import { observer } from "mobx-react-lite";


const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)

    useEffect(()=> {

    }, [])

    return (
        <div>
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)} />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)} />
            <button onClick={() => store.registration(email, password)}>Регистрация</button>
            <button onClick={() => store.login(email, password)}>Логин</button>
            <button onClick={() => store.logout()}>Выход</button>
        </div>
    )
}

export default observer(LoginForm);