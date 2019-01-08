import React from 'react';
import {
    Header,
    Container,
    List,
    Image,
    Dimmer,
    Loader
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import api from '../api';

class EmployeeList extends React.Component {
    state = {
        users: [],
        isLoading: false
    };
    componentDidMount() {
        this.getItems();
    }
    render() {
        var userList = this.state.users.map(user => {
            return (
                <List.Item
                    as={Link}
                    to={`/employee_overview/${user._id}`}
                    key={user._id}
                >
                    <Image avatar src="/images/avatar/small/helen.jpg" />
                    <List.Content>
                        <List.Header>
                            {user.nameFirst} {user.nameLast}
                        </List.Header>
                        {user.email}
                    </List.Content>
                </List.Item>
            );
        });
        return (
            <Container>
                <Loader active={this.state.isLoading}>Loading</Loader>
                <Header as="h3">Employees</Header>
                <List celled>{userList}</List>
            </Container>
        );
    }

    getItems = () => {
        this.setState({ isLoading: true });
        var config = { headers: { 'x-auth': sessionStorage.token } };
        api.get('/users', config).then(res => {
            this.setState({ users: res.data });
            console.log(res);
            this.setState({ isLoading: false });
        });
    };
}

export default EmployeeList;
