import React from 'react';

import {storiesOf} from '@storybook/react';

import { BrowserRouter } from 'react-router-dom';

import Commits from '../components/Commits'
import Error from '../components/Error'
import Loader from '../components/Loader'
import Repos from '../components/Repos'

storiesOf('Welcome', module).add('to Github Search!', () => 
<p>
    This is the Storybook for the Github Search application!
</p>);

storiesOf('Repos', module)
    .add('Get repositories from reactjs', () => (
        <BrowserRouter>
            <Repos user="reactjs"/>
        </BrowserRouter>
));

storiesOf('Commits', module)
    .add('Gets last 20 commits from the react-transition-group repository', () => (
    <Commits user="reactjs" repo="react-transition-group" limit="20"/>          
));

storiesOf('Error component', module)
    .add('Error message for Path is not Found', () => (
    <Error message="Path not found"/>
))
    .add('Error message for no commits found for the repository', () => (
    <Error message="No commits found for the repository"/>
));


storiesOf('Loader', module).add('Loader component', () => (
    <Loader/>
));