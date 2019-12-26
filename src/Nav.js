import React from 'react';
import { Grid, Button, Icon, Header } from 'semantic-ui-react';

function TopNavBar() {
    return (
        <Grid>
            <Grid.Row columns={3} centered>
                <Grid.Column>
                    <Button basic icon="bars">
                    </Button>
                </Grid.Column>
                <Grid.Column textAlign="center" verticalAlign="middle">
                    <Header>welcome to dwlee's home</Header>
                </Grid.Column>
                <Grid.Column/>
            </Grid.Row>
        </Grid>
    );
}

export {TopNavBar};