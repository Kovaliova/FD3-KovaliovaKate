import React from 'react';
import Product from './Product';
import './Shop.css';

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProductId: null,
      products: [], 
    };
  }

componentDidMount() {
    fetch('/products.json')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ products: data });
      })
      .catch((err) => {
        console.error('Ошибка при загрузке продуктов:', err);
      });
}

handleSelect = (id) => {
    this.setState(({ selectedProductId }) => ({
      selectedProductId: selectedProductId === id ? null : id,
    }));
  };

handleDelete = (id) => {
    this.setState(({ products, selectedProductId }) => {
      const newProducts = products.filter(p => p.id !== id);
      const newSelectedId = selectedProductId === id ? null : selectedProductId;
      return {
        products: newProducts,
        selectedProductId: newSelectedId,
      };
    });
};

render() {
    const { products, selectedProductId } = this.state;

    return (
   <div className="Shop">
        <table className="ProductTable">
          <thead>
            <tr>
              <th></th>
              <th>Название</th>
              <th>Цена</th>
              <th>В наличии</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
                isSelected={selectedProductId === product.id}
                onSelect={() => this.handleSelect(product.id)}
                onDelete={() => {if (window.confirm(`Удалить товар "${product.name}"?`)) {
                  this.handleDelete(product.id);
                 }
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Shop;
