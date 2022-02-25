import React from 'react';
import { useParams } from 'react-router-dom';
import { findClient } from '../../../utility/LocalStorage';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardText,
    CardTitle,
} from 'reactstrap';
import { formatCurrency, formatDate } from '../../../utility/Formatter';

const ClientView = () => {
    const { id } = useParams();
    const client = findClient(id);

    return (
        <div className='centredDiv' style={{ marginTop: '50px' }}>
            <Card>
                <CardHeader>{client.name}</CardHeader>
                <CardBody>
                    <CardTitle>
                        Services retained at the price of{' '}
                        {formatCurrency(client.retainer_fee)}
                    </CardTitle>
                    <CardText>{client.email}</CardText>
                    <Button>Go somewhere</Button>
                </CardBody>
                <CardFooter>
                    <small className='text-muted'>
                        Services retained on {formatDate(client.created_at)}
                    </small>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ClientView;
