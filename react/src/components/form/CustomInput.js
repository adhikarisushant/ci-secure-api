import React from 'react';
import {Input, Label} from 'reactstrap';
import {ErrorMessage, Field} from 'formik';

const getErrorDiv = message => {
    return (
        <div style={{color: '#dc3545'}}>
            {message}
        </div>
    );
};
const CustomInput = ({name, label, type = 'text'}) => {
    return (<>
        <Label for={name}>{label}</Label>
        <Field name={name}>
            {({field}) => {
                return (<>
                    <Input
                        type={type}
                        {...field}
                        placeholder={label}/>
                    <ErrorMessage
                        name={name}
                        render={getErrorDiv}
                    />
                </>)
            }}
        </Field>
    </>);
};

export default CustomInput;
