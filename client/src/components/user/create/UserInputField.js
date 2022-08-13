import { useState, useEffect } from "react";
import { InvalidInputError } from "./InvalidInputError";

export const UserInputField = (props) => {
    const [error, setError] = useState(!props.isUser );
    const min = props.min;
    const validator = props.validator;
    const positive = props.positive;

    useEffect(() => {
        props.setHasErrors(obj => {
            obj[props.name] = !!error;
            props.setErrorsChanged(prev => prev + 1)
            return obj;
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    const onInputHandler = (e) => {
        const value = e.currentTarget.value
        if (value === '') {
            setError(<InvalidInputError message={'Required'} />)
            return;
        }

        if (min) {
            setError(x => value.length < min 
                && <InvalidInputError message={`${props.text} should be at least ${min} characters long`} />)
        } else if (validator) {
             setError(x => !validator.test(value)
                && <InvalidInputError message={`${props.text} is not valid!`} />)
        } else if (positive) {
             setError(x => Number(value) <= 0
                && <InvalidInputError message={`${props.text} should be a positive number!`} />)
        } else {
            setError(false);
        }
    }
    
    return ( 
        <div className={`form-group ${props.className || ''}`}>
            <label htmlFor={props.name}>{props.text}</label>
            <div className="input-wrapper">
                <span><i className="fa-solid fa-user"></i></span>
                <input
                    id={props.name}
                    name={props.name}
                    type="text"
                    onChange={onInputHandler}
                    defaultValue={props.value || ''}
                />
            </div>
            {error}
        </div>
     );
}