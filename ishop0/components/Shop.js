import React from 'react';
import Product from './Product';
import './Shop.css';

class Shop extends React.Component {

  render() {
    const { name, address, products } = this.props;

    return (
      <div className='Shop'>
         <div className='ShopInformation'>
            <h1>Магазин: {name}</h1>
            <p>Адрес: {address}</p>
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
