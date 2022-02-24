const getItem = (itemName) => localStorage.getItem(itemName);

const saveItem = (itemName, itemValue) => {
    localStorage.setItem(itemName, itemValue);
};

const getFilteredClients = clientId => {
    return loadClients().filter(({id}) => clientId !== id);
};

export const loadUser = () => JSON.parse(getItem('user'));

export const saveUser = (user) => {
    saveItem('user', JSON.stringify(user));
};

export const loadJWT = () => getItem('token');

export const saveJWT = (token) => {
    saveItem('token', token);
};

export const loadClients = () => JSON.parse(getItem('clients'));

export const findClient = (clientId) =>
    loadClients().find(({id}) => id === clientId);

export const saveClients = (clients) => {
    saveItem('clients', JSON.stringify(clients));
};

export const addClient = (client) => {
    saveClients([...loadClients(), client]);
};

export const updateClient = (client) => {
    saveClients([...getFilteredClients(client.id), client]);
};

export const deleteClient = ({id}) => {
    saveClients(getFilteredClients(id));
};

export const clearState = () => {
    localStorage.clear();
};
