import React from 'react';
import { withTooltip } from './WithTooltip';
import './Product.css';

const Button = (props) => <button {...props} />;

const EditButtonWithTooltip = withTooltip(<span>Редактировать товар</span>, 'top', 300)(Button);
const DeleteButtonWithTooltip = withTooltip(<span>Удалить товар</span>, 'top', 300)(Button);

class Product extends React.Component {
  render() {
    const {
      product,
      isSelected,
      onSelect,
      onDelete,
      onEdit,
      isDisabled,
    } = this.props;

    return (
      <tr
        className={isSelected ? 'Selected' : ''}
        onClick={!isDisabled ? onSelect : undefined}
        style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
      >
        <td>
          <img src={product.imageUrl} alt={product.name} className="ProductImage" />
        </td>
        <td>{product.name}</td>
        <td>{product.price} бел.руб</td>
        <td>{product.stock}</td>
        <td>
          <EditButtonWithTooltip
            className="Edit"
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            disabled={isDisabled}
          >Редактировать</EditButtonWithTooltip>

          <DeleteButtonWithTooltip
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            disabled={isDisabled}
          >Удалить</DeleteButtonWithTooltip>
        </td>
      </tr>
    );
  }
}

export default Product;