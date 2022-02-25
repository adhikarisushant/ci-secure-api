import React from 'react';
import {UncontrolledAlert} from 'reactstrap';

const SuccessAlert = ({
                          message,
                          onTimeout
                      }) => {

    setTimeout(onTimeout, 4000);

    return (
        <div style={{margin: '20px'}}>
            <UncontrolledAlert color='success'>
                {message}
            </UncontrolledAlert>
        </div>
    )
}

export default SuccessAlert;
