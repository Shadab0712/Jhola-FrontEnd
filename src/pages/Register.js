
import React, { useState } from 'react';
import {
    Form,
    useNavigate,
} from 'react-router-dom';

export default function Register(event) {
    const [showForm, setShowForm] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const navigate = useNavigate();

    function cancelHandler() {
        navigate("/..");
    }
    function loginHandler() {
        navigate("/login");
    }

    async function submitHandler(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const userData = {
            username: formData.get('username'),
            fullName: formData.get("fullName"),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        };

        const response = await fetch('http://localhost:8081/api/v1/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        console.log(userData);
        if (response.status === 422) {
            const errorData = await response.json();
            console.error(errorData); // Log error details
        } else if (!response.ok) {
            console.error(' Could not save event.');
        } else {
            // Redirect to the register page on successful submission
            setShowForm(false);
            setRegistrationSuccess(true);
            navigate('/register');
        }
    }
    return (
        <div className='signup-container'>
            <div className='signup-form'>
                {registrationSuccess ? (
                    <p className='success-message'>Account has been created , please login !!</p>
                ) : (
                    (
                        <Form method='post' onSubmit={submitHandler}>
                            <p>
                                <label htmlFor="username">Username</label>
                                <input
                                    id="username"
                                    type="username"
                                    name="username"
                                    rows="1"
                                    required
                                    defaultValue={event ? event.title : ''}
                                    style={{ margin: '5px 5px 5px 30px' }}
                                />
                            </p>
                            <p>
                                <label htmlFor='fullName'>Full Name</label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    required
                                    defaultValue={event ? event.date : ''}
                                    style={{ margin: '5px 5px 5px 30px' }}
                                />
                            </p>
                            <p>
                                <label htmlFor='password'>Password</label>
                                <textarea
                                    id="password"
                                    name="password"
                                    type='password'
                                    required
                                    defaultValue={event ? event.description : ''}
                                    style={{ margin: '5px 5px 5px 30px' }}
                                />
                            </p>

                            <p>
                                <label htmlFor='confirmPassword'>Confirm Password</label>
                                <textarea
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type='password'
                                    required
                                    defaultValue={event ? event.duration : ''}
                                    style={{ margin: '5px 5px 5px 30px' }}
                                />
                            </p>

                            <div>
                                <button type="button" onClick={cancelHandler}>
                                    Cancel
                                </button>
                                <button type="submit">Sign Up</button>
                                <button type='submit' onClick={loginHandler} >LogIn</button>
                            </div>
                        </Form>
                    )
                )}
            </div>
        </div>
    );
}