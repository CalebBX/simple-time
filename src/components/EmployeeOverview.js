import React from 'react';
import { Header, Container, Button, Table } from 'semantic-ui-react';
// import { Route, Link } from 'react-router-dom';
import moment from 'moment';
import api from '../api';

class EmployeeOverview extends React.Component {
    state = {
        employee: {},
        time: [],
        isLoading: false
    };
    componentDidMount() {
        this.getEmployee();
        this.getTime();
    }
    render() {
        var employee = this.state.employee;

        var timeList = this.state.time.map(entry => {
            return (
                <Table.Row positive={entry.active} key={entry._id}>
                    <Table.Cell>
                        {moment(entry.clockIn).format('M/D/YY')}
                    </Table.Cell>
                    <Table.Cell>
                        {moment(entry.clockIn).format('h:mm a')}
                    </Table.Cell>
                    <Table.Cell>
                        {entry.clockOut
                            ? moment(entry.clockOut).format('h:mm a')
                            : 'Active'}
                    </Table.Cell>
                </Table.Row>
            );
        });
        return (
            <Container>
                <Header as="h2">
                    {employee.nameFirst} {employee.nameLast}
                </Header>
                <Container>
                    <p>Email: {employee.email}</p>
                </Container>
                <Button onClick={this.clockIn}>Clock In</Button>
                <Button onClick={this.clockOut}>Clock Out</Button>
                <Table singleLine selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Clock In</Table.HeaderCell>
                            <Table.HeaderCell>Clock Out</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{timeList}</Table.Body>
                </Table>
            </Container>
        );
    }
    getEmployee = () => {
        var config = { headers: { 'x-auth': sessionStorage.token } };
        var id = this.props.match.params.id;
        api.get(`/users/${id}`, config).then(res => {
            this.setState({ employee: res.data });
        });
    };
    getTime = () => {
        var config = { headers: { 'x-auth': sessionStorage.token } };
        var id = this.props.match.params.id;
        api.get(`/time/${id}`, config).then(res => {
            this.setState({ time: res.data });
            console.log(res);
        });
    };
    clockIn = () => {
        var config = { headers: { 'x-auth': sessionStorage.token } };
        api.post('/time/clockin', {}, config).then(res => {
            this.getTime();
        });
    };
    clockOut = () => {
        var config = { headers: { 'x-auth': sessionStorage.token } };
        api.post('/time/clockout', {}, config).then(res => {
            this.getTime();
        });
    };
}

export default EmployeeOverview;
