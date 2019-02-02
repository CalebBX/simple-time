import React from 'react';

import { Link } from 'react-router-dom';
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

class EmployeeList extends React.Component {
    state = {
        users: [],
        isLoading: false
    };
    componentDidMount() {
        this.getItems();
    }
    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <div>
                    {this.state.users.map(user => (
                        <Card square className={classes.card}>
                            <CardActionArea className={classes.cardActionArea} component={Link} to={`/employee_overview/${user._id}`}>
                                <Grid container spacing={32}>
                                    <Grid item md={1} xs={12}>
                                        <Avatar alt="Remy Sharp" src="/assets/img_avatar.png" className={classes.avatar} />
                                    </Grid>
                                    <Grid item md={5} xs={12}>
                                        <Typography variant="h6">
                                            {user.nameFirst + ' ' + user.nameLast}
                                        </Typography>
                                        <Grid />
                                    </Grid>
                                </Grid>
                            </CardActionArea>
                        </Card>
                    ))}
                </div>
            </div>

            // <List.Item
            //     as={Link}
            //     to={`/employee_overview/${user._id}`}
            //     key={user._id}
            // >


        );
    }

    getItems = () => {
        this.setState({ isLoading: true });
        let config = { headers: { 'x-auth': sessionStorage.token } };
        api.get('/users', config).then(res => {
            this.setState({ users: res.data });
            console.log(res);
            this.setState({ isLoading: false });
        });
    };
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 900,
        width: '100%'
    },
    card: {
        margin: theme.spacing.unit * 2,
    },
    cardActionArea: {
        padding: theme.spacing.unit * 2,
    },
});

export default withStyles(styles)(EmployeeList);