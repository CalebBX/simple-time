import React from 'react';
import { Redirect } from 'react-router-dom';
import api from '../api';
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment
} from 'semantic-ui-react';

class LoginForm extends React.Component {
    state = {
        email: '',
        password: '',
        loggedIn: false
    };
    render() {
        if (this.state.loggedIn === true) {
            return <Redirect to="/" />;
        }
        return (
            <div style={{ height: '100vh' }}>
                <Grid
                    textAlign="center"
                    style={{ height: '100%' }}
                    verticalAlign="middle"
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as="h2" textAlign="center">
                            {/* <Image src="/logo.png" /> */}
                            Log-in to your account
                        </Header>
                        <Form size="large" onSubmit={this.onFormSubmit}>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="E-mail address"
                                    value={this.state.email}
                                    onChange={e =>
                                        this.setState({ email: e.target.value })
                                    }
                                />
                                <Form.Input
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={e =>
                                        this.setState({
                                            password: e.target.value
                                        })
                                    }
                                />

                                <Button fluid size="large">
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            New to us? <a>Sign Up</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
    onFormSubmit = event => {
        event.preventDefault();
        api.post('/users/login', {
            email: this.state.email,
            password: this.state.password
        })
            .then(res => {
                this.setState({ loggedIn: true });
                sessionStorage.token = res.headers['x-auth'];
            })
            .catch(e => {
                console.log('error logging in');
                console.log(e);
            });
    };
}

export default LoginForm;
