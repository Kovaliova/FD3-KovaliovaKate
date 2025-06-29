import React from 'react';
import './Product.css';

class Product extends React.Component {
  render() {
    const { name, price, imageUrl, stock } = this.props.product;

    return (
      <div className="Product">
        <img src={imageUrl} alt={name} className="ProductImage" />
        <div className="ProductInfo">
          <h3>{name}</h3>
          <p className='Price'>{price} $</p>
          <p className='Stock'>В наличии: <span>{stock}</span></p>
        </div>
      </div>
    );
  }
}

export default Product;
