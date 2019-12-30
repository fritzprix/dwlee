import React, { createRef, useState, useEffect } from 'react';
import {
    BrowserView,
    MobileView
} from 'react-device-detect';
import { CareerList } from './Careers';
import { Segment, Card, Image, Grid, Rail, Icon, Label, Sticky, Ref, Placeholder, Divider } from 'semantic-ui-react';
import Axios, { CancelToken } from 'axios';

function SocialBadge({ social }) {
    return (
        <div>
            {(social && social.length > 0) && (
                <Label ribbon basic>
                    {social.map(({ type, url, color }, i) => {
                        return (
                            <a key={i} href={url}>
                                <Icon name={type} size="big" color={color} />
                            </a>
                        );
                    })}
                </Label>
            )}
        </div>
    );
}

function MobileAboutMe({ intro }) {
    const contextRef = createRef();
    return (
        <div>
            {intro ? (
                <Ref innerRef={contextRef}>
                    <Segment>
                        <Sticky context={contextRef}>
                            <SocialBadge social={intro.social} />
                        </Sticky>
                        <Card centered>
                            <Image src={intro.photo} />
                            <Card.Content>
                                <Card.Header>
                                    {intro.name} ({intro.gbName})
                            </Card.Header>
                                <Card.Description>
                                    {intro.whoim}
                                </Card.Description>
                                <Card.Meta>
                                    {intro.tags && (
                                        <div>
                                            <Divider />
                                            {intro.tags.map((tag, idx) => <Label key={idx} basic circular>#{tag}</Label>)}
                                            <Divider />
                                        </div>
                                    )}
                                </Card.Meta>
                            </Card.Content>
                        </Card>
                        <CareerList />
                    </Segment>
                </Ref>
            ) : (
                    <Placeholder>
                        <Placeholder.Image />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder>
                )}
        </div>
    );
}

function BrowserAbountMe({ intro }) {
    const contextRef = createRef();
    return (
        <div>
            {intro ? (
                <Grid centered columns={2}>
                    <Grid.Column>
                        <Ref innerRef={contextRef}>
                            <Segment basic>
                                <CareerList />
                                <Rail close position="left">
                                    <Sticky context={contextRef}>
                                        <Card centered>
                                            <Image src={intro.photo} />
                                            <Card.Content>
                                                <Card.Header>
                                                    {intro.name} ({intro.gbName})
                                                </Card.Header>
                                                <Card.Description>
                                                    {intro.whoim}
                                                </Card.Description>
                                                <Card.Meta>
                                                    {intro.tags && (
                                                        <div>
                                                            <Divider />
                                                            {intro.tags.map((tag, idx) => <Label key={idx} basic circular>#{tag}</Label>)}
                                                            <Divider />
                                                        </div>
                                                    )}
                                                </Card.Meta>
                                                <SocialBadge social={intro.social} />
                                            </Card.Content>
                                        </Card>
                                    </Sticky>
                                </Rail>
                            </Segment>
                        </Ref>
                    </Grid.Column>
                </Grid>
            ) : (
                    <Placeholder>
                        <Placeholder.Image />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder>
                )}
        </div>
    );
}

function AboutMe() {
    const [intro, setIntro] = useState(undefined);
    const source = CancelToken.source();
    useEffect(() => {
        Axios.get(`https://raw.githubusercontent.com/fritzprix/dwlee/master/public/intro.json`, {
            cancelToken: source.token
        }).then(({ status, data }) => {
            if (status === 200) {
                setIntro(data);
            }
        }).catch(err => {
            // request canceled
        })
        return () => source.cancel('');
    }, [])
    return (
        <div>
            <BrowserView>
                <BrowserAbountMe intro={intro} />
            </BrowserView>
            <MobileView>
                <MobileAboutMe intro={intro} />
            </MobileView>
        </div>

    );
}

export { AboutMe };