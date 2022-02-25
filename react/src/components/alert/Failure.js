import React from 'react';
import {UncontrolledAlert} from 'reactstrap';

const FailureAlert = ({errors}) => {
    return (
        <UncontrolledAlert color='danger'>
            <h4 className='alert-heading'>Request Failed</h4>
            <hr/>
            <ul className='plainList'>
                {Object.values(errors).map((error, index) => {
                    return <li key={index}>{error}</li>
                })}
            </ul>
        </UncontrolledAlert>
    )
}

export default FailureAlert;
