import React from 'react';
// import { Route, Link } from 'react-router-dom';
import moment from 'moment';
import api from '../api';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';

import Clock from 'react-live-clock';

class EmployeeOverview extends React.Component {
    state = {
        jobs: ['Raymer', 'Little Rock', 'Cayuse', 'Waterfall', 'Ripshaw', 'Creekside', 'Charleston-extra'],
        newJob: false
    };
    handleNewJob = () => {
        this.setState({ newJob: true })
    }
    handleNewJobClose = () => {
        this.setState({ newJob: false })
    }
    render() {
        const { classes } = this.props
        const modal = (
            <Modal
                open={this.state.newJob}
                onClose={this.handleNewJobClose}
            >
                <div className={classes.modal}>
                    <Paper className={classes.paper}>
                        <Typography variant="title">New Job</Typography>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Job Name</InputLabel>
                            <Input></Input>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                variant="outlined"
                                multiline
                                label="Description"
                            ></TextField>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <Fab color="primary"><AddIcon /></Fab>
                        </FormControl>
                    </Paper>
                </div>
            </Modal>
        )
        return (
            <div className={classes.root}>
                <Typography variant="h4" className={classes.clock}>
                    <Clock format={'h:mm a'} ticking={true} timezone={'US/Pacific'} />
                </Typography>
                <div>
                    <Select
                        placeholder="Select Job"
                        value=""
                        displayEmpty
                    // onChange=""
                    // inputProps={{
                    //     name: 'age',
                    //     id: 'age-simple',
                    // }}
                    >
                        <MenuItem value="">
                            <em>Select Job</em>
                        </MenuItem>
                        {this.state.jobs.map(name => (
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                    <Button onClick={this.handleNewJob}>New job</Button>
                    {modal}
                </div>
                <div>
                    <Fab className={classes.button} color="primary" variant="extended"><AddIcon /> Clock In</Fab>
                </div>
            </div>
        )
    }
    componentDidMount() {

    }

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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        margin: theme.spacing.unit
    },
    clock: {
        margin: theme.spacing.unit * 1
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing.unit * 4,
    },
    modal: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 4,
        marginRight: theme.spacing.unit * 4,
        // [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        //     width: 400,
        //     marginLeft: 'auto',
        //     marginRight: 'auto',
        // },
    },
    formControl: {
        margin: theme.spacing.unit
    }
});

export default withStyles(styles)(EmployeeOverview);
