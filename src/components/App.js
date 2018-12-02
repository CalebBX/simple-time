import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility
} from 'semantic-ui-react';

import TimeClock from './TimeClock';

class App extends React.Component {
    state = { visible: false };

    handleHideClick = () => this.setState({ visible: false });
    handleShowClick = () => this.setState({ visible: true });
    handleSidebarHide = () => this.setState({ visible: false });

    render() {
        const { visible } = this.state;
        return (
            <div>
                <Sidebar.Pushable as={Segment}>
                    <Router>
                        <Sidebar
                            as={Menu}
                            animation="overlay"
                            icon="labeled"
                            inverted
                            onHide={this.handleSidebarHide}
                            vertical
                            visible={visible}
                            width="thin"
                        >
                            <Menu.Item as="a">
                                <Icon name="home" />
                                Dashboard
                            </Menu.Item>
                            <Menu.Item as="a">
                                <Icon name="users" />
                                Employees
                            </Menu.Item>
                            <Menu.Item as="a">
                                <Icon name="calendar" />
                                Calendar
                            </Menu.Item>
                        </Sidebar>
                    </Router>

                    <Sidebar.Pusher dimmed={visible}>
                        <Menu inverted top>
                            <Menu.Item onClick={this.handleShowClick}>
                                <Icon name="bars" />
                            </Menu.Item>
                        </Menu>
                        <Container>
                            <Segment basic>
                                <Header as="h3">Application Content</Header>
                                <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
                            </Segment>
                            <Segment basic>
                                <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
                            </Segment>
                            <Segment basic>
                                <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
                            </Segment>
                            <Segment basic>
                                <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
                            </Segment>
                            <Segment basic>
                                <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
                            </Segment>
                            <Segment basic>
                                <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
                            </Segment>
                            <Segment basic>
                                <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
                            </Segment>
                            <Segment basic>
                                <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
                            </Segment>
                        </Container>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

export default App;
