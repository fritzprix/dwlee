import React, { useEffect, useState } from 'react';
import { Segment, Container, Embed, Header, Placeholder } from "semantic-ui-react";

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
                    <Container>
                        {item.description}
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
                return <CareerItem key={i} id={id} />;
            })}
        </Segment>
    );
}

export { CareerList };