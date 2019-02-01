import React from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

function TimeList(props) {
    const { classes } = props
    return (
        <List>
            {props.time.map(entry => (
                <div>
                    <ListItem className={classes.list} key={entry.id} button>
                        <Grid container spacing={16} direction="row">
                            <Grid item xs={3}>
                                <Typography>
                                    {moment(entry.clockIn).format('M/D/YY')}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography>
                                    {moment(entry.clockIn).format('h:mm a')}
                                </Typography>

                            </Grid>
                            <Grid item xs={3}>
                                <Typography>
                                    {entry.clockOut
                                        ? moment(entry.clockOut).format('h:mm a')
                                        : 'Active'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <Divider />
                </div>
            ))}
        </List>
    )
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

export default withStyles(styles)(TimeList);