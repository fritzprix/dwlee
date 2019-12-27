import React from 'react';
import { Grid, Button, Icon, Header } from 'semantic-ui-react';

function TopNavBar() {
    return (
        <Grid>
            <Grid.Row columns={15} centered verticalAlign="middle">
                <Grid.Column/>
                <Grid.Column textAlign="center" verticalAlign="middle" width={11}>
                    <Header>Welcome to dwlee's home</Header>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Button basic icon="bars">
                    </Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export {TopNavBar};