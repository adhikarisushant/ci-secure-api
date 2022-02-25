import React from 'react'; 
import { loadUser } from '../../../utility/LocalStorage'; 
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap'; 
import { formatDate } from '../../../utility/Formatter';

const UserProfile = () => { 
    const user = loadUser(); 
    return (
        user.name, 
        user.email,
        formatDate(user.created_at)
    );
}; 

export default UserProfile;