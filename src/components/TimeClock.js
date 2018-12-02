import React from 'react';
import { Button, Container } from 'semantic-ui-react';
import api from '../api';

class TimeClock extends React.Component {
    state = {
        currentEntryId: ''
    };
    render() {
        this.isClockedOn = this.state.currentEntryId !== '';
        return (
            <Container>
                <Button onClick={this.clockIn}>Clock In</Button>
                <Button onClick={this.clockOut}>Clock Out</Button>
                <Button onClick={this.clockedon}>Clock In</Button>
            </Container>
        );
    }
    clockedon = () => {
        api.get('/classes/Entries', { where: { objectId: '88rJOlHde5' } }).then(
            res => {
                console.log(res);
            }
        );
    };
    clockIn = () => {
        api.post('/classes/Entries', {
            clockIn: new Date()
        }).then(res => {
            this.setState({ currentEntryId: res.data.objectId });
            console.log(res.data);
        });
    };
    clockOut = () => {
        api.put(`/classes/Entries/${this.state.currentEntryId}`, {
            clockOut: new Date()
        }).then(res => {
            this.setState({ currentEntryId: '' });
        });
    };
}

export default TimeClock;
