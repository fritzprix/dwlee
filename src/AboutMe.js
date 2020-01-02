import React, { useState, useEffect } from 'react';
import {
    BrowserView,
    MobileView
} from 'react-device-detect';
import { Segment, Card, Image,  Icon, Label, Sticky,  Placeholder, Divider } from 'semantic-ui-react';
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

function MobileAboutMe({ intro, containerRef }) {
    return (
        <div>
            {intro ? (
                <Segment>
                    <Sticky context={containerRef}>
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
                </Segment>
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

function BrowserAbountMe({ intro, containerRef }) {
    return (
        <div>
            {intro ? (
                <Segment basic>
                        <Sticky context={containerRef}>
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
                </Segment>
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

function AboutMe({containerRef}) {
    const [intro, setIntro] = useState(undefined);
    const source = CancelToken.source();
    useEffect(() => {
        Axios.get(`https://raw.githubusercontent.com/dwidlee/article/master/intro.json`, {
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
                <BrowserAbountMe intro={intro} containerRef={containerRef}/>
            </BrowserView>
            <MobileView>
                <MobileAboutMe intro={intro} containerRef={containerRef}/>
            </MobileView>
        </div>

    );
}

export { AboutMe };