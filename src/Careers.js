import React, { useEffect, useState } from 'react';
import { Segment, Container, Embed, Header, Placeholder, Divider, Label, Card, Accordion, Icon } from "semantic-ui-react";

import Axios, { CancelToken } from 'axios';
import res from './TestRes';

function CareerItem({ id }) {
    const [item, setItem] = useState(undefined);
    const [detail, setDetail] = useState(false);
    const source = CancelToken.source();
    useEffect(() => {
        Axios.get(`${document.location}/career_${id}.json`, {
            cancelToken: source.token
        }).then(({ status, data }) => {
            if (status === 200) {
                setItem(data);
            }
        }).catch(err => {

        });

        return () => source.cancel('');
    }, [source, id]);
    return (
        <div>
            {item ? (
                <Segment>
                    <Header>
                        {item.title}
                    </Header>
                    {item.media && <Embed {...item.media} autoplay={true} />}
                    {item.opensource && (
                        <Label basic href={item.opensource.url}>
                            <Icon name={item.opensource.type} size="large"/>
                            {item.opensource.url}
                        </Label>
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
                            <Accordion.Title onClick={() => setDetail(!detail)}>
                                <Icon name='angle down' />
                                more
                            </Accordion.Title>
                            <Accordion.Content active={detail}>
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
                    <div key={i}>
                        <CareerItem id={id} />
                        <br />
                    </div>
                );
            })}
        </div>
    );
}

export { CareerList };