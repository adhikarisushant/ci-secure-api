import React, {useState} from 'react';
import Login from './Login';
import Register from './Register';
import {Button} from 'reactstrap';
import FailureAlert from '../alert/Failure';
import {makeRequest} from '../../utility/Api';
import successfulAuthenticationCallback from '../../utility/Authentication';

const Authentication = ({setIsAuthenticated}) => {
    const [isLogin, setIsLogin] = useState(false);
    const [errors, setErrors] = useState(null);

    const submitCallback = (values) => {
        makeRequest({
            url: `auth/${isLogin ? 'login' : 'register'}`,
            values,
            successCallback: (data) => {
                successfulAuthenticationCallback(data);
                setIsAuthenticated();
            },
            failureCallback: (errorResponse) => {
                setErrors(errorResponse)
            }
        });
    };

    return (
        <div className='centredDiv' style={{width: '60%'}}>
            {errors && <FailureAlert errors={errors}/>}
            {isLogin ?
                <Login submitCallback={submitCallback}/> :
                <Register submitCallback={submitCallback}/>
            }
            <Button
                style={{marginTop: '10px'}}
                block
                outline
                color={'primary'}
                onClick={() => {
                    setIsLogin(!isLogin)
                }}
            >
                {isLogin ? 'Register' : 'Login'}
            </Button>
        </div>
    );
};

export default Authentication;
