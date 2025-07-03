import React from 'react';
import Product from './Product';
import './Shop.css';

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProductId: null,
    };
  }

  handleProductClick = (productId) => {
    this.setState((prevState) => ({
      selectedProductId:
        prevState.selectedProductId === productId ? null : productId,
    }));
  };

  render() {
    const { name, address, products } = this.props;
    const { selectedProductId } = this.state;

    return (
      <div className="Shop">
        <div className="ShopInformation">
          <h1>Магазин: {name}</h1>
          <p>Адрес: {address}</p>
        </div>
        <div className="ProductList">
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              isSelected={selectedProductId === product.id}
              onClick={() => this.handleProductClick(product.id)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Shop;
