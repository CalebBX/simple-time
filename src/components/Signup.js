import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import api from '../api';

import UILink from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

class Signup extends React.Component {
    state = {
        email: '',
        password: '',
        nameFirst: '',
        nameLast: '',
        loggedIn: false
    };
    render() {
        const { classes } = this.props;
        if (this.state.loggedIn === true) {
            return <Redirect to="/" />;
        }
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel>First Name</InputLabel>
                        <Input
                            autoFocus
                            value={this.state.nameFirst}
                            onInput={e =>
                                this.setState({
                                    nameFirst: e.target.value
                                })
                            }
                        />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel>Last Name</InputLabel>
                        <Input
                            value={this.state.nameLast}
                            onInput={e =>
                                this.setState({
                                    nameLast: e.target.value
                                })
                            }
                        />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel>Email Address</InputLabel>
                        <Input
                            id="email"
                            value={this.state.email}
                            onInput={e =>
                                this.setState({
                                    email: e.target.value
                                })
                            }
                        />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            type="password"
                            id="password"
                            value={this.state.password}
                            onInput={e =>
                                this.setState({
                                    password: e.target.value
                                })
                            }

                        />
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={this.signUp}
                    >
                        Sign in
                    </Button>
                    <Typography className={classes.link}>
                        Already have an account? <UILink component={Link} to="/login">Log In</UILink>
                    </Typography>
                </Paper>
            </main>
        );
    }
    signUp = event => {
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
const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    link: {
        marginTop: theme.spacing.unit * 2,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
});

export default withStyles(styles)(Signup);
