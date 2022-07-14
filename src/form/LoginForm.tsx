import React, { useContext,  useState } from "react"
import styles from './LoginForm.module.css'
import { Context, TypeRootStore } from ".."
import { observer } from "mobx-react-lite"
import { Button, ButtonGroup, Card, Form } from "react-bootstrap"


const LoginForm: React.FC  = observer(() => {
    const [username, setUsername] = useState<string>("Moshe Avadiya")
    const [email, setEmail] = useState<string>("moshe.avadiya.2019@gmail.com")
    const [password, setPassword] = useState<string>("moshe2019")
    const { authStore }: TypeRootStore = useContext(Context)

    return (
        <Card className={styles.card}>

            <Form>
                <Form.Group className={styles.input} controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        hidden={authStore.isRegistered}
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(event: any) => setUsername(event.target.value)}
                    />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                < Form.Group className={styles.input} controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event: any) => setEmail(event.target.value)}
                    />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className={styles.input} controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event: any) => setPassword(event.target.value)}
                    />
                </Form.Group>

                <ButtonGroup size="lg">
                    <Button
                        variant="info"
                        onClick={() => authStore.registration(username, email, password)}
                    >
                        Registration
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => authStore.login(email, password)}
                    >
                        Login
                    </Button>
                    <Button
                        variant="warning"
                        onClick={() => authStore.logout()}
                    >
                        Logout
                    </Button>
                    <Button
                        variant="info"
                        onClick={() => authStore.getAll()}
                    >
                        GetAll
                    </Button>
                </ButtonGroup>
            </Form>

        </Card>
    )
})

export default LoginForm