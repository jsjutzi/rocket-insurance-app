import {
    BrowserRouter as Router,
    Switch,
    Route 
} from 'react-router-dom';

import RatingsInfo from './components/RatingsInfo'

export default (
    <Router>
        <Switch>
            <Route component={RatingsInfo} exact path='/' />
        </Switch>
    </Router>
);