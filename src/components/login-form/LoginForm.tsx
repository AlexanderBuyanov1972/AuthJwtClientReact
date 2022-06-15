import React, { FC, useContext, useEffect, useState } from "react";
import './LoginForm.module.css'
import { Context } from "../..";
import { observer } from "mobx-react-lite";


const LoginForm: FC = () => {
    const [username, setUsername] = useState<string>("alex")
    const [email, setEmail] = useState<string>("globalist72@gmail.com")
    const [password, setPassword] = useState<string>("12345")
    const { store } = useContext(Context)

    useEffect(() => {

    }, [])

    return (
        <div>
            <input
                hidden={store.isRegistered}
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)} />
            <br />
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)} />
            <br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)} />
            <br />
            <button onClick={() => store.registration(username, email, password)}>Регистрация</button>
            <button onClick={() => store.login(email, password)}>Логин</button>
            <button onClick={() => store.logout()}>Выход</button>
        </div>
    )
}

export default observer(LoginForm);