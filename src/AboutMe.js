import React, { createRef } from 'react';
import {
    BrowserView,
    MobileView
} from 'react-device-detect';
import { CareerList } from './Careers';
import { Segment, Card, Image, Container, Grid, Rail, Header, Icon, Label, Button, Sticky, Ref } from 'semantic-ui-react';

function AboutMe() {
    const contextRef = createRef();
    return (
        <div>
            <BrowserView>
                <Grid centered columns={2}>
                    <Grid.Column>
                        <Ref innerRef={contextRef}>
                            <Segment basic>
                                <CareerList />
                                <Rail close position="left">
                                    <Sticky context={contextRef}>
                                        <Card centered>
                                            <Image src="matthew.png" />
                                            <Card.Content>
                                                <Card.Header>
                                                    Doowoong Lee (David Lee)
                                        </Card.Header>
                                                <Card.Description>
                                                    I'm David, a passionate software engineer and open-source advocate. I enjoy writing program that fullfils my interest in spare time, and sharing them through open source platform. (e.g. github) if you feel like to check my projects, check my github profile below.
                                        </Card.Description>
                                                <Label ribbon basic>
                                                    <a href='https://github.com/fritzprix'>
                                                        <Icon name='github' size='big' />
                                                    </a>
                                                    <a href='https://kr.linkedin.com/in/david-lee-7630b6146'>
                                                        <Icon name='linkedin' color='blue' size='big' />
                                                    </a>
                                                </Label>
                                            </Card.Content>
                                        </Card>
                                    </Sticky>
                                </Rail>
                            </Segment>
                        </Ref>
                    </Grid.Column>
                </Grid>
            </BrowserView>
            <MobileView>
                <Segment>
                    <Card centered>
                        <Image src="matthew.png" />
                        <Card.Content>
                            <Card.Header>
                                Doowoong Lee (David Lee)
                                        </Card.Header>
                            <Card.Description>
                                I'm David, a passionate software engineer and open-source advocate. I enjoy writing program that fullfils my interest in spare time, and sharing them through open source platform. (e.g. github) if you feel like to check my projects, check my github profile below.
                                        </Card.Description>
                            <Label ribbon basic>
                                <a href='https://github.com/fritzprix'>
                                    <Icon name='github' size='big' />
                                </a>
                                <a href='https://kr.linkedin.com/in/david-lee-7630b6146'>
                                    <Icon name='linkedin' color='blue' size='big' />
                                </a>
                            </Label>
                        </Card.Content>
                    </Card>
                    <CareerList />
                </Segment>

            </MobileView>
        </div>

    );
}

export { AboutMe };