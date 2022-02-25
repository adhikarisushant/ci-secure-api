import React, {useEffect, useState} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, NavLink, Table, UncontrolledButtonDropdown,} from 'reactstrap';
import {formatCurrency, formatDate} from '../../../utility/Formatter';
import {makeRequest} from '../../../utility/Api';
import {loadJWT, saveClients} from '../../../utility/LocalStorage';
import SuccessAlert from '../../alert/Success';
import LoadingAlert from '../../alert/Loading';
import {Link} from 'react-router-dom';

const ClientsTable = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [clients, setClients] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const onTimeout = () => {
        setShowSuccessAlert(false);
    };

    const updateClients = (clients) => {
        setClients(clients);
        saveClients(clients);
    };

    const deleteClient = (clientId) => {
        makeRequest({
            url: `client/${clientId}`,
            successCallback: (data) => {
                setResponseMessage(data.message);
                updateClients(clients.filter(({id}) => id !== clientId));
                setShowSuccessAlert(true);
            },
            failureCallback: (error) => {
                console.log(error);
            },
            requestType: 'DELETE',
            authorization: loadJWT(),
        });
    };

    useEffect(() => {
        makeRequest({
            url: 'client',
            successCallback: (data) => {
                const {message, clients} = data;
                updateClients(clients);
                setIsLoading(false);
                setShowSuccessAlert(true);
                setResponseMessage(message);
            },
            failureCallback: (error) => {
                console.log(error);
            },
            requestType: 'GET',
            authorization: loadJWT(),
        });
    }, []);

    return isLoading ? (
        <LoadingAlert/>
    ) : (
        <>
            {showSuccessAlert && (
                <SuccessAlert {...{message: responseMessage, onTimeout}} />
            )}
            <div style={{textAlign: 'center', margin: '20px'}}>
                <h1> All Clients</h1>
            </div>
            <Table responsive hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>Retainer Start</th>
                    <th>Retainer Fee</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {clients.map((client, index) => (
                    <tr key={client.id}>
                        <th scope='row'>{index + 1}</th>
                        <td>{client.name}</td>
                        <td>{client.email}</td>
                        <td>{formatDate(client.created_at)}</td>
                        <td>{formatCurrency(client.retainer_fee)}</td>
                        <td>
                            <UncontrolledButtonDropdown>
                                <DropdownToggle caret>Actions</DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <NavLink
                                            tag={Link}
                                            to={`/client/view/${client.id}`}>
                                            View Client
                                        </NavLink>
                                    </DropdownItem>
                                    <DropdownItem divider/>
                                    <DropdownItem>
                                        <NavLink
                                            tag={Link}
                                            to={`/client/edit/${client.id}`}>
                                            Edit Client
                                        </NavLink>
                                    </DropdownItem>
                                    <DropdownItem divider/>
                                    <DropdownItem
                                        onClick={() => {
                                            deleteClient(client.id);
                                        }}
                                    >
                                        Delete Client
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
};

export default ClientsTable;
