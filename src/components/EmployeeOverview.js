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


import TimeList from './TimeList.js'

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
        const { classes } = this.props




        return (
            <div>
                <Typography variant="h3">
                    {employee.nameFirst} {employee.nameLast}
                </Typography>
                <Typography variant="subtitle1">
                    Email: {employee.email}
                </Typography>

                <TimeList time={this.state.time} />
            </div>

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

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    list: {
        // width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

export default withStyles(styles)(EmployeeOverview);
