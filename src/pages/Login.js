
import React, { useState } from 'react';
import {
    Form,
    useNavigate,
} from 'react-router-dom';

export default function Login(event) {
    const [showForm, setShowForm] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const navigate = useNavigate();

    function cancelHandler() {
        navigate("/..");
    }

    function signUpHandler(){
        navigate("/register");
    }

    async function submitHandler(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const loginData = {
            username: formData.get('username'),
            password: formData.get('password'),
        };

        const response = await fetch('http://localhost:8081/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        });
        if (response.status === 422) {
            const errorData = await response.json();
            console.error(errorData); // Log error details
        } else if (!response.ok) {
            console.error(' Could not save event.');
        } else {

            const resData = await response.json();
        const token = resData.token; 
        
        //  logic to store token in localStorage
        
        localStorage.setItem('token' , token );
        
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem('expiration' , expiration.toISOString());

            // Redirect to the register page on successful submission
            setShowForm(false);
            setRegistrationSuccess(true);
            navigate('/product');
        }
    }
    return (
        <div className='login-container'>
            <div className='login-form'>
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
                        <label htmlFor='password'>Password</label>
                        <textarea
                            id="password"
                            type="password"
                            name="password"
                            rows="1"
                            required
                            defaultValue={event ? event.description : ''}
                            style={{ margin: '5px 5px 5px 30px' }}
                        />
                    </p>

                    <div>
                        <button type="button" onClick={cancelHandler}>
                            Cancel
                        </button>
                        <button type="submit">LogIn</button>
                        <button type='submit' onClick={signUpHandler}>Sign Up</button>
                    </div>
                </Form>
            </div>
        </div>
    );
}