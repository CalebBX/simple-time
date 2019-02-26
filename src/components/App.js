import React from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import api from '../api';

import EmployeeList from './EmployeeList';
import EmployeeOverview from './EmployeeOverview';
import Login from './Login';
import Signup from './Signup';
import Placeholder from './PlaceholderContent'
import Router from './Router'

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

class App extends React.Component {
    state = {
        drawerOpen: false
    }
    toggleDrawer = () => {
        this.setState({ drawerOpen: !this.state.drawerOpen })
    }
    logout = () => {
        let config = { headers: { 'x-auth': sessionStorage.token } };
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
    render() {
        const { classes } = this.props
        if (!sessionStorage.token) {
            if (
                window.location.pathname !== '/login' &&
                window.location.pathname !== '/signup'
            ) {
                return <Redirect to="/login" />;
            }
            return (
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                </Switch>
            );
        }
        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <ListItem button component={Link} to="/time-clock" key="time-clock">
                        <ListItemIcon><Icon>access_time</Icon></ListItemIcon>
                        <ListItemText primary="Time Clock" />
                    </ListItem>
                    <ListItem button component={Link} to="/employees" key="employees">
                        <ListItemIcon><Icon>people</Icon></ListItemIcon>
                        <ListItemText primary="Employees" />
                    </ListItem>
                </List>
            </div>

        )
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.toggleDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap className={classes.grow}>
                            SimpleTime
                        </Typography>
                        <Button className={classes.logoutButton} color="inherit" onClick={this.logout}>Logout</Button>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer}>
                    <Hidden smUp implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="temporary"
                            onClose={this.toggleDrawer}
                            open={this.state.drawerOpen}
                        >
                            {drawer}

                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}

                        </Drawer>
                    </Hidden>
                </nav>

                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Router />
                </main>
            </div>
        );
    }
}
const drawerWidth = 240;
const styles = theme => ({
    root: {
        display: 'flex',
    },
    grow: {
        flexGrow: 1,
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    logoutButton: {
        marginLeft: -12
    }
});

export default withStyles(styles)(App);