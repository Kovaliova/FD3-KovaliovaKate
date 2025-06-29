import React from 'react';
import Product from './Product';
import './Shop.css';

class Shop extends React.Component {

  render() {
    const { products } = this.props;

    return (
      <div className='Shop'>
         <div className='ShopInformation'>
            <h1>Магазин: {this.props.name}</h1>
            <p>Адрес: {this.props.address}</p>
        </div>
          <div className="ProductList">
            {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  }

}

export default Shop;
