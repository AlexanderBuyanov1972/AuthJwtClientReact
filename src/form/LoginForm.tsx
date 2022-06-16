import React, { FC, useContext, useEffect, useState } from "react";
import styles from './LoginForm.module.css'
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { Button, ButtonGroup, Card, Form } from "react-bootstrap";


const LoginForm: FC = () => {
    const [username, setUsername] = useState<string>("alex")
    const [email, setEmail] = useState<string>("globalist72@gmail.com")
    const [password, setPassword] = useState<string>("12345")
    const { store } = useContext(Context)

    useEffect(() => {

    }, [])

    return (
        <Card className={styles.card}>
            
                <Form>
                    <Form.Group className={styles.input} controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            hidden={store.isRegistered}
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>

                    < Form.Group  className={styles.input} controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>

                    <Form.Group  className={styles.input} controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </Form.Group>

                    <ButtonGroup size="lg">
                        <Button
                            variant="info"
                            onClick={() => store.registration(username, email, password)}
                        >
                            Registration
                        </Button>
                        <Button
                            variant="success"
                            onClick={() => store.login(email, password)}
                        >
                            Login
                        </Button>
                        <Button
                            variant="warning"
                            onClick={() => store.logout()}
                        >
                            Logout
                        </Button>
                        <Button
                            variant="info"
                            onClick={() => store.getAll()}
                        >
                            GetAll
                        </Button>
                    </ButtonGroup>
                </Form>
            
        </Card>
    )
}

export default observer(LoginForm);