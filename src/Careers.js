import React, { useEffect, useState } from 'react';
import { Segment, Container, Embed, Header, Placeholder, Divider, Label } from "semantic-ui-react";

import Axios, { CancelToken } from 'axios';
import res from './TestRes';

function CareerItem({ id }) {
    const [item, setItem] = useState(undefined);
    const source = CancelToken.source();
    useEffect(() => {
        Axios.get(`${document.location}/career_${id}.json`, {
            cancelToken: source.token
        }).then(({ status, data }) => {
            if (status === 200) {
                setItem(data);
            }
        }).catch(err => {

        })

        return () => source.cancel('');
    }, []);
    return (
        <div>
            {item ? (
                <Segment>
                    <Header>
                        {item.title}
                    </Header>
                    {item.media && <Embed {...item.media} autoplay={true} />}
                    <Divider/>
                        {item.tags && item.tags.map((tag,i) => <Label key={i} circular basic size="mini">#{tag}</Label>)}
                    <Divider/>
                    <Container text fluid>
                        <Header as='h4'>
                            {item.summary}
                        </Header>
                        <p>
                            {item.description}
                        </p>
                    </Container>
                </Segment>
            ) : (
                    <Placeholder>
                    </Placeholder>
                )}
        </div>


    );
}

function CareerList() {
    const items = res.items;
    return (
        <Segment basic>
            {items && items.map((id, i) => {
                return (
                    <div key={i}>
                        <CareerItem id={id} />
                        <br/>
                    </div>
                );
            })}
        </Segment>
    );
}

export { CareerList };