import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { Segment, Container, Embed, Header, Placeholder, Divider, Label, Card, Accordion, Icon } from "semantic-ui-react";
import ReactMarkdown from "react-markdown";

import Axios, { CancelToken } from 'axios';

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

function CareerItem({ path }) {
    const [item, setItem] = useState(undefined);
    const [showBackgroundStory, setShowBackgroundStory] = useState(false);
    const [markdown, setMarkdown] = useState(undefined);
    const [detail, setDetail] = useState(undefined);
    const source = CancelToken.source();
    useEffect(() => {
        Axios.get(`https://raw.githubusercontent.com/dwidlee/article/master/prjs/${path}/index.json`, {
            cancelToken: source.token
        }).then(({ status, data }) => {
            if (status === 200) {
                setItem(data);
                if (data.detail) {
                    Axios.get(`https://raw.githubusercontent.com/dwidlee/article/master/prjs/${path}/${data.detail}`, {
                        cancelToken: source.token
                    }).then(({ status, data }) => {
                        if (status === 200) {
                            setDetail(data);
                        }
                    }).catch(ignored => { });
                }
                if (data.summary) {
                    Axios.get(`https://raw.githubusercontent.com/dwidlee/article/master/prjs/${path}/${data.summary}`, {
                        cancelToken: source.token
                    }).then(({ status, data }) => {
                        if (status === 200) {
                            setMarkdown(data);
                        }
                    }).catch(ignored => { });
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
                            {item.description}
                        </Header>
                        <Accordion>
                            <Accordion.Title onClick={() => setShowBackgroundStory(!showBackgroundStory)}>
                                <Icon name='angle down' />
                                long story
                            </Accordion.Title>
                            <Accordion.Content active={showBackgroundStory}>
                                <p>
                                    {detail}
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
    const [careers, setCareers] = useState(undefined);
    const source = CancelToken.source();
    useEffect(() => {
        Axios.get(`https://raw.githubusercontent.com/dwidlee/article/master/prjs/index.json`, {
            cancelToken: source.token
        }).then(({ status, data }) => {
            if (status === 200) {
                setCareers(data.items);
            }
        }).catch(err => {

        });

        return () => source.cancel('');
    }, []);
    return (
        <div>
            {careers && careers.map((career, i) => {
                return (
                    <LazyLoad key={i} height={500}>
                        <CareerItem path={career} />
                        <br />
                    </LazyLoad>
                );
            })}
        </div>
    );
}

export { CareerList };