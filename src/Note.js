import React, { useEffect, useState, createRef } from 'react';
import Axios, { CancelToken } from 'axios';
import ReactMarkdown from "react-markdown";
import { Header, Container, Placeholder, Label, Divider, Button, Icon, Modal, Sticky, Ref } from 'semantic-ui-react';
import LazyLoad from 'react-lazyload';
import ReactGA from 'react-ga';

function PageableView({ pages, base }) {
    return (
        <>
            {pages && pages.map((page, idx) => (
                <LazyLoad key={idx}>
                    <PageView page={page} base={base} />
                </LazyLoad>
            ))}
        </>

    );
}

function PageView({ page, base }) {
    const [content, setContent] = useState(undefined);
    const source = CancelToken.source();
    useEffect(() => {
        Axios.get(`${base}/${page}`, {
            cancelToken: source.token
        }).then(({ status, data }) => {
            if (status === 200) {
                ReactGA.event({
                    category: 'User',
                    action: 'Scroll Article',
                    label: page
                });
                setContent(data);
            }
        }).catch(ignored => { });
        return () => source.cancel('');
    }, []);

    return (
        <>
            {content ? (
                <ReactMarkdown>
                    {content}
                </ReactMarkdown>
            ) : (
                    <Placeholder>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder>
                )}
        </>
    );
}

function NoteItem({ articlePath }) {
    const [article, setArticle] = useState(undefined);
    const source = CancelToken.source();
    const contextRef = createRef();
    useEffect(() => {
        Axios.get(`https://raw.githubusercontent.com/dwidlee/article/master/articles/${articlePath}/index.json`, {
            cancelToken: source.token
        }).then(({ status, data }) => {
            if (status === 200) {
                setArticle(data);
            }
        }).catch(ignored => { });

        return () => source.cancel('');

    }, []);
    return (
        <div>
            {article ? (
                <Container text>
                    <Modal dimmer="blurring" closeIcon={<Icon name='close' />} onOpen={() => {
                        ReactGA.event({
                            category: 'User',
                            action: 'View Article',
                            label: articlePath
                        });
                    }} trigger={(<Button floated="right" basic icon>
                        <Icon name="book" />
                        Read
                    </Button>)}>
                        <Modal.Header>
                            {article.title}
                        </Modal.Header>
                        <Modal.Content scrolling>
                            <Modal.Description>
                                <PageableView base={`https://raw.githubusercontent.com/dwidlee/article/master/articles/${articlePath}/`} pages={article.pages} />
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>

                    <Header as='h2'>{article.title}</Header>
                    <Divider />
                    {article.tags && article.tags.map((tag, i) => <Label key={i} circular basic size="mini">#{tag}</Label>)}
                    <Divider />
                    <p>
                        {article.summary}
                    </p>
                </Container>
            ) : (
                    <Placeholder>
                        <Placeholder.Header>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Header>
                    </Placeholder>
                )}
        </div>
    );
}




function NoteList() {
    const [articles, setArticles] = useState(undefined);
    const source = CancelToken.source();
    ReactGA.pageview('/note');
    useEffect(() => {
        Axios.get('https://raw.githubusercontent.com/dwidlee/article/master/articles/index.json', {
            cancelToken: source.token
        }).then(({ status, data }) => {
            if (status === 200) {
                setArticles(data.articles);
            }
        }).catch(ignored => { });

        return () => source.cancel('');

    }, []);
    return (
        <div>
            {articles ? (
                <div>
                    {(articles.length > 0) ? (
                        articles.map((article, idx) => {
                            return (
                                <LazyLoad key={idx}>
                                    <NoteItem articlePath={article} />
                                </LazyLoad>
                            );
                        })) : (
                            <Container textAlign="center">
                                No note found
                            </Container>
                        )}
                </div>

            ) : (
                    <Placeholder>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder>
                )}
        </div>
    );
}

export { NoteList };