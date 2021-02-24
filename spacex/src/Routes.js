import React,{useState} from 'react'
import { history } from '../src/_redux/_store/history'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../src/_pages/Dashboard.jsx'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/dashboard" component={Dashboard} />          
        </Switch>
    )
}

export default Routes
