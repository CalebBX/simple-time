import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import api from '../api';

import { Container, Icon, Menu } from 'semantic-ui-react';

import PlaceholderContent from './PlaceholderContent';
import EmployeeList from './EmployeeList';
import EmployeeOverview from './EmployeeOverview';
import Login from './Login';

class App extends React.Component {
    render() {
        if (!sessionStorage.token) {
            if (window.location.pathname !== '/login') {
                return <Redirect to="/login" />;
            }
            return <Route path="/login" component={Login} />;
        }
        return (
            <div>
                <Menu inverted={true}>
                    <Menu.Item as={Link} to="/">
                        <Icon name="home" />
                        Dashboard
                    </Menu.Item>
                    <Menu.Item as={Link} to="/employees">
                        <Icon name="users" />
                        Employees
                    </Menu.Item>

                    <Menu.Item as={Link} to="/placeholder">
                        <Icon name="calendar" />
                        test
                    </Menu.Item>

                    <Menu.Item as="a" onClick={this.logout}>
                        <Icon name="calendar" />
                        logout
                    </Menu.Item>
                </Menu>

                <Container style={{ height: '100vh' }}>
                    <Route path="/employees" component={EmployeeList} />
                    <Route
                        path="/employee_overview/:id"
                        component={EmployeeOverview}
                    />
                    <Route path="/placeholder" component={PlaceholderContent} />
                    <Route path="/" />
                </Container>
            </div>
        );
    }

    logout = () => {
        var config = { headers: { 'x-auth': sessionStorage.token } };
        api.delete('/users/logout', config)
            .then(res => {
                console.log('logged out');
                sessionStorage.removeItem('token');
                this.forceUpdate();
            })
            .catch(e => {
                console.log(e);
            });
    };
}

export default App;
