import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div className="product-detail-page">
      <div className="container">
        <h1>Product Detail</h1>
        <p>Product ID: {id}</p>
        <p>Product detail page will be implemented here</p>
      </div>
    </div>
  );
};

export default ProductDetail; 