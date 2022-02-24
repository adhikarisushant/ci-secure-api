import {saveJWT, saveUser} from './LocalStorage';

const successfulAuthenticationCallback = (data) => {
    const {user, access_token} = data;
    saveUser(user);
    saveJWT(access_token);
};

export default successfulAuthenticationCallback;
