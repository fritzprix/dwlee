import React, { createRef } from 'react';
import { Segment, Grid, Rail, Ref, Tab } from 'semantic-ui-react';
import { AboutMe } from './AboutMe';
import { ProjectList } from './Project';
import { NoteList } from './Note';
import ReactGA from 'react-ga';

import { TopNavBar } from './Nav'
import { BrowserView, MobileView } from 'react-device-detect';


function MobileApp() {
    const contextRef = createRef();
    const panes = [
        { menuItem: 'projects', render: () => <Tab.Pane><ProjectList /></Tab.Pane> },
        { menuItem: 'notes', render: () => <Tab.Pane><NoteList /></Tab.Pane> }
    ]
    return (
        <Ref innerRef={contextRef}>
            <Segment basic>
                <AboutMe containerRef={contextRef} />
                <br />
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </Segment>
        </Ref>
    );
}

function BrowserApp() {
    const contextRef = createRef();
    const panes = [
        { menuItem: 'projects', render: () => <Tab.Pane><ProjectList /></Tab.Pane> },
        { menuItem: 'notes', render: () => <Tab.Pane><NoteList /></Tab.Pane> }
    ]
    return (
        <Grid centered columns={2}>
            <Grid.Column>
                <Ref innerRef={contextRef}>
                    <Segment basic>
                        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
                        <Rail position="left">
                            <AboutMe containerRef={contextRef} />
                        </Rail>
                    </Segment>
                </Ref>
            </Grid.Column>
        </Grid>
    );
}

function App() {
    return (
        <div>
            <Segment>
                <TopNavBar />
            </Segment>
            <BrowserView>
                <BrowserApp />
            </BrowserView>
            <MobileView>
                <MobileApp />
            </MobileView>
        </div>
    );
}

export default App;