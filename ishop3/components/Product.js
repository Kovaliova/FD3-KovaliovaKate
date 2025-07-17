import React from 'react';
import './Product.css';

class Product extends React.Component {
  render() {
    const product = this.props.product;
    const isSelected = this.props.isSelected;
    const onSelect = this.props.onSelect;
    const onDelete = this.props.onDelete;
    const onEdit = this.props.onEdit;
    const isDisabled = this.props.isDisabled;

    return (
      <tr className={isSelected ? 'Selected' : ''} onClick={!isDisabled ? onSelect : undefined} style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}>
        <td><img src={product.imageUrl} alt={product.name} className="ProductImage" /></td>
        <td>{product.name}</td> 
        <td>{product.price} бел.руб</td>  
        <td>{product.stock}</td>    
        <td>
          <button className="Edit" onClick={(e) => {e.stopPropagation(); onEdit();}}disabled={isDisabled}>Редактировать</button>
          <button onClick={(e) => {e.stopPropagation();onDelete();}}disabled={isDisabled}>Удалить</button>
        </td>
      </tr>
    );
  }
}

export default Product;
