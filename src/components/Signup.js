import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import api from '../api';
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment
} from 'semantic-ui-react';

class Signup extends React.Component {
    state = {
        email: '',
        password: '',
        nameFirst: '',
        nameLast: '',
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
                            Sign up for an account
                        </Header>
                        <Form size="large" onSubmit={this.onFormSubmit}>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="First Name"
                                    value={this.state.nameFirst}
                                    onInput={e =>
                                        this.setState({
                                            nameFirst: e.target.value
                                        })
                                    }
                                />
                                <Form.Input
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Last Name"
                                    value={this.state.nameLast}
                                    onInput={e =>
                                        this.setState({
                                            nameLast: e.target.value
                                        })
                                    }
                                />
                                <Form.Input
                                    fluid
                                    icon="envelope"
                                    iconPosition="left"
                                    placeholder="E-mail address"
                                    value={this.state.email}
                                    onInput={e =>
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
                                    onInput={e =>
                                        this.setState({
                                            password: e.target.value
                                        })
                                    }
                                />

                                <Button fluid size="large">
                                    Sign Up
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            Already have an account?{' '}
                            <Link to="/login">Log in</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
    onFormSubmit = event => {
        event.preventDefault();
        api.post('/users', {
            email: this.state.email,
            password: this.state.password,
            nameFirst: this.state.nameFirst,
            nameLast: this.state.nameLast
        })
            .then(res => {
                sessionStorage.token = res.headers['x-auth'];
                this.setState({ loggedIn: true });
            })
            .catch(e => {
                console.log('error logging in');
                console.log(e);
            });
    };
}

export default Signup;
