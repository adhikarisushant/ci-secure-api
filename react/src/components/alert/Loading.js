import React from 'react';
import {Spinner} from 'reactstrap';

const LoadingAlert = () => {
    return (
        <div className='centredDiv'>
            <Spinner size='lg' type='grow' color='dark'/>
        </div>
    );
};

export default LoadingAlert;
