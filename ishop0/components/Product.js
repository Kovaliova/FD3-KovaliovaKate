import React from 'react';
import './Product.css';

class Product extends React.Component {
  render() {
    const { product, isSelected, onClick } = this.props;
    const { name, price, imageUrl, stock } = product;

    return (
      <div
        className={`Product ${isSelected ? 'Selected' : ''}`}
        onClick={onClick}
      >
        <img src={imageUrl} alt={name} className="ProductImage" />
        <div className="ProductInfo">
          <h3>{name}</h3>
          <p className="Price">{price} $</p>
          <p className="Stock">В наличии: <span>{stock}</span></p>
        </div>
      </div>
    );
  }
}

export default Product;
