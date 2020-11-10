import * as React from 'react'
import { connect } from 'react-redux'
import { Button } from '../_shared'
import Form from '../_shared/form/form'
import { Text } from "../_shared"

class Login extends React.Component {

    handleLogin(){
        console.log("Not implemented yet");
    }

    render() {
        return (
            <div className="login">
                <div className="title">
                <Text strong size="l">Login</Text>
                </div>
                <Form>
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Username"/>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password"/>
                    <Button skin="highlight" onClick={this.handleLogin}>Login</Button>
                </Form>
            </div>
        )
    }
}

export default Login