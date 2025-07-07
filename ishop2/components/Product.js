import React from 'react';
import './Product.css';

class Product extends React.Component {
  render() {
    const { product, isSelected, onSelect, onDelete } = this.props;
    const { name, price, imageUrl, stock } = product;

    return (
      <tr
        className={isSelected ? 'Selected' : ''}
        onClick={onSelect}
        style={{ cursor: 'pointer' }}
      >
        <td>
          <img src={imageUrl} alt={name} className="ProductImage" />
        </td>
        <td>{name}</td>
        <td>{price} бел.руб</td>
        <td>{stock}</td>
        <td>
          <button onClick={e => {e.stopPropagation();onDelete();}}>
            Удалить
          </button>
        </td>
      </tr>
    );
  }
}

export default Product;
