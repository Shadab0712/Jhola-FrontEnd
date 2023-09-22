import React from "react";

export default function ProductDetail(props) {

    return (
        <div>
            <div>
                <h3>{props.product.productId}</h3>
                <h2>{props.product.productName}</h2>
            </div>
            <div>
                <h3>{props.product.description}</h3>
                <h3>Rs. {props.product.price}</h3>
            </div>
            <div>
                <h3>{props.product.category}</h3>
            </div>
            <hr></hr>
            <br></br>
        </div>
    );
}