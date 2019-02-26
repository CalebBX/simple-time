import React from 'react'
import { Route, Link, Redirect, Switch } from 'react-router-dom';

import Home from './Home'
import EmployeeList from './EmployeeList';
import EmployeeOverview from './EmployeeOverview';
import TimeClock from './TimeClock';
import Placeholder from './PlaceholderContent'

function Router() {
    return (
        <div>
            <Route path="/" component={Home} />
            <Route path="/employees" component={EmployeeList} />
            <Route
                path="/employee-overview/:id"
                component={EmployeeOverview}
            />
            <Route path="/time-clock" component={TimeClock} />
        </div>
    )
}
export default Router;