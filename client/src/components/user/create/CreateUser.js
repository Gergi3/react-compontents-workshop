import { useState, useEffect } from 'react';

import { UserInputField } from "./UserInputField";
import { createUser, getUserById, editUserById} from '../../../api/api';
import { Svg } from '../../shared/Svg';

export const CreateUser = (props) => {
    const userId = props._id
    const [hasErrors, setHasErrors] = useState({
        firstName: !userId,
        lastName: !userId,
        email: !userId,
        phoneNumber: !userId,
        imageUrl: !userId,
        country: !userId,
        city: !userId,
        street: !userId,
        streetNumber: !userId
    });

    const [errorsChanged, setErrorsChanged] = useState(1);
    const [canSave, setCanSave] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {
        if (userId) {
            getUserById(userId)
                .then(res => setUser(res.user))
                .catch(err => console.error(err));
        }
    }, []);

    useEffect(() => {
        setCanSave(Object.values(hasErrors).reduce((acc, x) => {
            if (x) {
                acc = false;
            }
            return acc;
        }, true));
    }, [errorsChanged]);


    const closeHandler = () => {
        props.setAddIsShown(false)
    }

    const onSaveHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            imageUrl: formData.get('imageUrl'),
            phoneNumber: formData.get('phoneNumber'),
            address: {
                country: formData.get('country'),
                city: formData.get('city'),
                street: formData.get('street'),
                streetNumber: Number(formData.get('streetNumber'))
            }
        }

        const func = user ? editUserById : createUser

        func(data, user?._id)
            .then(res => {
                props.setReloadUsers(true)
                closeHandler();
            })
            .catch(err => {
                console.error(err)
            });
    }

    return (
        <div className="overlay">
            <div className="backdrop"></div>
            <div className="modal">
                <div className="user-container">
                    <header className="headers">
                        <h2>{user ? 'Edit User' : 'Add User'}</h2>
                        <button className="btn close" onClick={closeHandler}>
                            <Svg 
                                icon="xmark"
                                viewBox="0 0 320 512"
                                className="fa-xmark"
                                d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
                            />
                        </button>
                    </header>
                    <form onSubmit={onSaveHandler}>
                        <div className="form-row">
                            <UserInputField
                                value={user?.firstName} 
                                name="firstName"
                                text="First name"
                                min={3}
                                setHasErrors={setHasErrors}
                                setErrorsChanged={setErrorsChanged}
                                isUser={userId}
                            />
                            <UserInputField 
                                value={user?.lastName} 
                                name="lastName"
                                text="Last name"
                                min={3}
                                setHasErrors={setHasErrors}
                                setErrorsChanged={setErrorsChanged}
                                isUser={userId} />
                        </div>

                        <div className="form-row">
                            <UserInputField 
                                value={user?.email} 
                                name="email"
                                text="Email"
                                validator={/^[A-Za-z0-9_.]+@[A-Za-z]+\.[A-Za-z]{2,3}$/}
                                setHasErrors={setHasErrors}
                                setErrorsChanged={setErrorsChanged}
                                isUser={userId}
                            />
                            <UserInputField 
                                value={user?.phoneNumber} 
                                name="phoneNumber"
                                text="Phone number"
                                validator={/^0[1-9]{1}[0-9]{8}$/}
                                setHasErrors={setHasErrors}
                                setErrorsChanged={setErrorsChanged}
                                isUser={userId}
                            />
                        </div>
                        
                        <UserInputField 
                            value={user?.imageUrl} 
                            name="imageUrl"
                            text="Image Url"
                            validator={/^https?:\/\/.+/}
                            className="long-line"
                            setHasErrors={setHasErrors}
                            setErrorsChanged={setErrorsChanged}
                            isUser={userId} 
                        />
                        
                        <div className="form-row">
                            <UserInputField 
                                value={user?.address?.country} 
                                name="country"
                                text="Country"
                                min={2}
                                setHasErrors={setHasErrors}
                                setErrorsChanged={setErrorsChanged}
                                isUser={userId}
                            />
                            <UserInputField 
                                value={user?.address?.city} 
                                name="city"
                                text="City"
                                min={3}
                                setHasErrors={setHasErrors}
                                setErrorsChanged={setErrorsChanged}
                                isUser={userId}
                            />
                        </div>

                        <div className="form-row">
                            <UserInputField 
                                value={user?.address?.street} 
                                name="street"
                                text="Street"
                                min={3}
                                setHasErrors={setHasErrors}
                                setErrorsChanged={setErrorsChanged}
                                isUser={userId}
                            />
                            <UserInputField 
                                value={user?.address?.streetNumber} 
                                name="streetNumber"
                                text="Street number"
                                positive={true}
                                setHasErrors={setHasErrors}
                                setErrorsChanged={setErrorsChanged}
                                isUser={userId}
                            />
                        </div>

                        <div id="form-actions">
                            <button id="action-save" className="btn" type="submit" disabled={!canSave}>Save</button>
                            <button id="action-cancel" className="btn" type="button" onClick={closeHandler}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}