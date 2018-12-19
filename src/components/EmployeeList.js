import React from 'react';
import { Header, Container, List, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import api from '../api';

class EmployeeList extends React.Component {
    state = {
        users: []
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
                <Header as="h3">Employees</Header>
                <List celled>{userList}</List>
            </Container>
        );
    }

    getItems = () => {
        var config = { headers: { 'x-auth': sessionStorage.token } };
        api.get('/users', config).then(res => {
            this.setState({ users: res.data });
            console.log(res);
        });
    };
}

export default EmployeeList;
