import './ProductForm.css';
import React, { useState } from 'react';

import {
    Form,
    useNavigate,
    useActionData,
    json,
    redirect,
    useNavigation
} from 'react-router-dom';

export default function ProductForm({ method, event }) {
    const data = useActionData();
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();
    const navigation = useNavigation();

    const toggleForm = () => {
        setShowForm(!showForm);
    }

    function cancelHandler() {
        navigate('..');
    }

    async function submitHandler(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const productData = {
            productName: formData.get('productName'),
            description: formData.get('description'),
            category: formData.get('category'),
            price: formData.get('price')
        };

        const response = await fetch('http://localhost:8086/api/v1/product/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        });

        if (response.status === 422) {
            const errorData = await response.json();
            console.error(errorData); // Log error details
        } else if (!response.ok) {
            console.error(' Could not save event.');
        } else {
            // Redirect to the course page on successful submission
            setShowForm(false);
            navigate('/product');
        }
    }

    return (
        <div>
            <button type='button' onClick={toggleForm}>Add Product</button>
            {showForm && (
                <Form method='post' onSubmit={submitHandler}>
                    <p>
                        <label htmlFor="productName">Product Name</label>
                        <input
                            id="productName"
                            type="text"
                            name="productName"
                            required
                            defaultValue={event ? event.title : ''}
                            style={{ margin: '5px 5px 5px 30px' }}
                        />
                    </p>
                    <p>
                        <label htmlFor='category'>Category</label>
                        <input
                            id="category"
                            name="category"
                            required
                            defaultValue={event ? event.date : ''}
                            style={{ margin: '5px 5px 5px 30px' }}
                        />
                    </p>
                    <p>
                        <label htmlFor='description'>Description</label>
                        <textarea
                            id="description"
                            name="description"
                            required
                            defaultValue={event ? event.description : ''}
                            style={{ margin: '5px 5px 5px 30px' }}
                        />
                    </p>

                    <p>
                        <label htmlFor='price'>Price</label>
                        <textarea
                            id="price"
                            name="price"
                            rows="1"
                            type='int'
                            required
                            defaultValue={event ? event.duration : ''}
                            style={{ margin: '5px 5px 5px 30px' }}
                        />
                    </p>

                    <div>
                        <button type="button" onClick={cancelHandler}>
                            Cancel
                        </button>
                        <button type="submit">Save</button>
                    </div>
                </Form>
            )}
        </div>
    );
}