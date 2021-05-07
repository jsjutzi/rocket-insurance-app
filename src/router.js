import {
    BrowserRouter as Router,
    Switch,
    Route 
} from 'react-router-dom';

import LandingPage from './components/LandingPage'

export default (
    <Router>
        <Switch>
            <Route component={LandingPage} exact path='/' />
        </Switch>
    </Router>
);