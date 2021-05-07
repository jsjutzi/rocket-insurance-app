import {
    BrowserRouter as Router,
    Switch,
    Route 
} from 'react-router-dom';

import LandingPage from './components/LandingPage'

export default (
    <Router basename={process.env.PUBLIC_URL}>
        <Switch>
            <Route component={LandingPage} exact path='/rocket-insurance-app' />
        </Switch>
    </Router>
);