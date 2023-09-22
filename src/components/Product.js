import { useLoaderData } from "react-router-dom";
import ProductForm from './ProductForm';
import ProductDetail from './ProductDetail';
import React, { useState } from 'react';

export default function Product() {
    let data = useLoaderData();
    // state define kari hai 'All' ko initialise krdia hai selectedState m
    let [selectedCategory , setSelectedCategory ] = useState('All');


    // products ki array lenge as an input or category paas karnge isme jo chaiye
    const filterProductsByCategory = (products, category) => {
        if (category === "All") {
            return products; 
        }
        // filter hoke chaiye hai
        return products.filter((product) => product.category === category);
    };

    // isse category ki state change hojayegi previous bali s new bali m jab b y function call hoga
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    // selected category or uska filtered data mil jayga pura ek variable m
    const filteredProducts = filterProductsByCategory(data, selectedCategory);

    return (
        <div>
            <h1>List of Products</h1>
            <div>
                <button onClick={() => handleCategoryChange("All")}>All</button>
                <button onClick={() => handleCategoryChange("ELECTRONICS")}>Electronics</button>
                <button onClick={() => handleCategoryChange("FASHION")}>Fashion</button>
                <button onClick={() => handleCategoryChange("MAKEUP")}>Makeup</button>
            </div>

            <ProductForm />

            {filteredProducts.map((product) => (
                <div key={product.productId}>
                    <ProductDetail key={product.productId} product={product} />
                </div>
            ))}
        </div>
    );
}
export async function loader() {
    //XHR / fetch me jayaga data
    const response = await fetch('http://localhost:8086/api/v1/product/all', {
        method: 'GET'
    });

    console.log('Request:', response);

    if (!response.ok) {
        console.error("Error Occured");
        throw new Error('Failed to fetch data');
    }
    // JSON me data aayega network s or Java Script k object m convert krdega json() method
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
}