import React from 'react';
// import { Route, Link } from 'react-router-dom';
import moment from 'moment';
import api from '../api';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import { DatePicker } from 'material-ui-pickers';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

import TimeList from './TimeList.js'

class EmployeeOverview extends React.Component {
    state = {
        employee: {},
        time: [],
        showDateRange: false,
        isLoading: false,
        dateStart: new Date(),
        dateEnd: new Date()
    };
    componentDidMount() {
        this.getEmployee();
        this.getTime();
    }
    render() {
        let employee = this.state.employee;
        const { classes } = this.props

        let dateRange;
        if (this.state.showDateRange) {
            dateRange = (
                <div>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                            value={this.state.dateStart}
                            onChange={date =>
                                this.setState({
                                    dateStart: date._d
                                })}>
                        </DatePicker>
                        <DatePicker
                            value={this.state.dateEnd}
                            onChange={date =>
                                this.setState({
                                    dateEnd: date._d
                                })}>
                        </DatePicker>
                    </MuiPickersUtilsProvider>
                    <Button onClick={() =>
                        this.getTime('range')
                    }>Go</Button>
                </div>
            )
        }

        return (
            <div>
                <Button onClick={this.clockIn}>Clock In</Button>
                <Button onClick={this.clockOut}>Clock Out</Button>
                <Typography variant="h3">
                    {employee.nameFirst} {employee.nameLast}
                </Typography>
                <Typography variant="subtitle1">
                    Email: {employee.email}
                </Typography>

                <div>
                    <Button onClick={() =>
                        this.setSort('today')
                    }>Today</Button>
                    <Button onClick={() =>
                        this.setSort('range')
                    }
                    >Range</Button>
                    <Button onClick={() =>
                        this.setSort('all')
                    }>All</Button>

                </div>
                {dateRange}

                <TimeList time={this.state.time} />
            </div>

        );
    }
    setSort(sort) {
        if (sort === 'range') {
            this.setState({ showDateRange: true });
            return;
        }
        this.setState({ showDateRange: false });
        this.getTime(sort);
    }
    getEmployee = () => {
        let config = { headers: { 'x-auth': sessionStorage.token } };
        let id = this.props.match.params.id;
        api.get(`/users/${id}`, config).then(res => {
            this.setState({ employee: res.data });
        });
    };
    getTime = (sort) => {

        console.log()
        let dateStart;
        let dateEnd;
        switch (sort) {
            case 'today':
                dateStart = new Date()
                dateStart.setHours(0, 0, 0)
                dateEnd = new Date()
                break;
            case 'range':
                dateStart = this.state.dateStart
                dateStart.setHours(0, 0, 0)
                dateEnd = this.state.dateEnd
                dateEnd.setHours(23, 59, 59, 999)
                break;
            default:
                break;
        }
        let config = { headers: { 'x-auth': sessionStorage.token } };
        let id = this.props.match.params.id;
        api.post(`/time/${id}`, { dateStart, dateEnd }, config).then(res => {
            this.setState({ time: res.data });
            console.log(res);
        });
    };

    clockIn = () => {
        let config = { headers: { 'x-auth': sessionStorage.token } };
        api.post('/time/clockin', {}, config).then(res => {
            this.getTime();
        });
    };
    clockOut = () => {
        let config = { headers: { 'x-auth': sessionStorage.token } };
        api.post('/time/clockout', {}, config).then(res => {
            this.getTime();
        });
    };
}

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    list: {
        // width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing.unit
    }
});

export default withStyles(styles)(EmployeeOverview);
