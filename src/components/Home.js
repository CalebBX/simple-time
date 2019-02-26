import React from 'react'
import { Route, Link, Redirect, Switch } from 'react-router-dom';

function Home() {
    return (
        <Redirect to="/time-clock"></Redirect>
    )
}
export default Home;