import React from 'react';
import {Route, Routes} from 'react-router-dom';
import UserProfile from '../restricted/user/Profile';
import ClientsTable from '../restricted/client/ViewAll';
import PageNotFound from '../alert/PageNotFound';
import ClientView from '../restricted/client/ViewOne';
import AddClientForm from '../restricted/client/form/AddClient';
import EditClientForm from '../restricted/client/form/EditClient';

const PageRoutes = () => (
    <Routes>
        <Route path='/' exact element={ClientsTable}/>
        <Route path={'/profile'} element={UserProfile}/>
        <Route path={'/client/view/:id'} element={ClientView}/>
        <Route path={'/client/add'} element={AddClientForm}/>
        <Route path={'/client/edit/:id'} element={EditClientForm}/>
        <Route path={'*'} element={PageNotFound}/>
    </Routes>
);
export default PageRoutes;
