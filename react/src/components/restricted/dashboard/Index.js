import React from 'react';
import DashboardMenu from './Menu';
import {BrowserRouter as Router} from 'react-router-dom';
import PageRoutes from '../../routing/PageRoutes';

const Dashboard = ({logout}) => {

    return (
        <Router>
            <>
                <DashboardMenu logout={logout}/>
                <PageRoutes />
            </>
        </Router>
    )
};

export default Dashboard;
