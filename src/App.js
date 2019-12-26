import React from 'react';
import { Segment } from 'semantic-ui-react';
import {BrowserRouter, Route} from 'react-router-dom';
import {AboutMe} from './AboutMe';

import { TopNavBar } from './Nav'

function App() {
    return (
        <div>
            <Segment>
                <TopNavBar />
            </Segment>
            <Segment basic>
                <BrowserRouter>
                    <Route exact path='/' component={AboutMe}/>
                </BrowserRouter>
            </Segment>
        </div>
    );
}

export default App;