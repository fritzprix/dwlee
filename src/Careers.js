import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { Segment, Container, Embed, Header, Placeholder, Divider, Label, Card, Accordion, Icon } from "semantic-ui-react";
import ReactMarkdown from "react-markdown";

import Axios, { CancelToken } from 'axios';
import res from './TestRes';

function OpenSourceBanner({ project }) {
    return (
        <>
            {project && (
                <Label href={project.url} basic attached="top">
                    <Icon name={project.type} size="large" />
                    {project.name}
                </Label>
            )}
        </>
    );
}

function CareerItem({ id }) {
    const [item, setItem] = useState(undefined);
    const [showBackgroundStory, setShowBackgroundStory] = useState(false);
    const [markdown, setMarkdown] = useState(undefined);
    const source = CancelToken.source();
    useEffect(() => {
        Axios.get(`https://raw.githubusercontent.com/fritzprix/dwlee/master/public/career_${id}.json`, {
            cancelToken: source.token
        }).then(({ status, data }) => {
            if (status === 200) {
                setItem(data);
                if (data.markdown) {
                    Axios.get(data.markdown, {
                        cancelToken: source.token
                    }).then(({ status, data }) => {
                        if (status === 200) {
                            setMarkdown(data);
                        }
                    })
                }
            }
        }).catch(err => {

        });

        return () => source.cancel('');
    }, []);

    return (
        <div>
            {item ? (
                <Segment>
                    {item.opensource && <OpenSourceBanner project={item.opensource} />}
                    <Header>
                        {item.title}
                    </Header>
                    {item.media && <Embed {...item.media} autoplay={true} />}
                    {markdown && (
                        <ReactMarkdown>
                            {markdown}
                        </ReactMarkdown>
                    )}
                    <Divider />
                    <Card.Meta>
                        {item.tags && item.tags.map((tag, i) => <Label key={i} circular basic size="mini">#{tag}</Label>)}
                    </Card.Meta>
                    <Divider />
                    <Container text fluid>
                        <Header as='h4'>
                            {item.summary}
                        </Header>
                        <Accordion>
                            <Accordion.Title onClick={() => setShowBackgroundStory(!showBackgroundStory)}>
                                <Icon name='angle down' />
                                long story
                            </Accordion.Title>
                            <Accordion.Content active={showBackgroundStory}>
                                <p>
                                    {item.description}
                                </p>
                            </Accordion.Content>
                        </Accordion>
                    </Container>
                </Segment>
            ) : (
                    <Placeholder>
                        <Placeholder.Header>
                            <Placeholder.Line />
                            <Placeholder.Image />
                        </Placeholder.Header>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder>
                )}
        </div>


    );
}

function CareerList() {
    const items = res.items;
    return (
        <div>
            {items && items.map((id, i) => {
                return (
                    <LazyLoad key={i} height={500}>
                        <CareerItem id={id} />
                        <br />
                    </LazyLoad>
                );
            })}
        </div>
    );
}

export { CareerList };