// ProductCard.js
import React from 'react';
import { withTooltip } from './WithTooltip';

const SaveButton = (props) => <button {...props}>{props.children}</button>;
const CancelButton = (props) => <button {...props}>{props.children}</button>;

const SaveButtonWithTooltip = withTooltip('Сохранить изменения', 'top', 300)(SaveButton);
const CancelButtonWithTooltip = withTooltip('Отменить изменения', 'top', 300)(CancelButton);

class ProductCard extends React.Component {
  handleChange = (field, value) => {
    const { onChange } = this.props;
    onChange(field, value);
  };

  render() {
    const {
      product,
      formMode,
      formErrors,
      touchedFields,
      showErrors,
      onSave,
      onCancel,
    } = this.props;

    if (!formMode) return null;

    const isEditable = formMode === 'edit' || formMode === 'add';

    const isValid = !formErrors || Object.values(formErrors).every((e) => !e);

    return (
      <div className="ProductCard">
        <h3>
          {formMode === 'add'
            ? 'Добавление товара'
            : formMode === 'edit'
            ? 'Редактирование товара'
            : 'Просмотр товара'}
        </h3>

        {['name', 'price', 'stock', 'imageUrl'].map((field) => (
          <div key={field} className="FormField">
            <label>{field}:</label>
            <input
              type="text"
              value={product[field]}
              onChange={(e) => this.handleChange(field, e.target.value)}
              disabled={!isEditable}
            />
            {(touchedFields?.[field] || showErrors) && formErrors?.[field] && (
              <span className="Error">{formErrors[field]}</span>
            )}
          </div>
        ))}

        {isEditable && (
          <div className="FormButtons">
            <SaveButtonWithTooltip onClick={onSave} disabled={!isValid}>{formMode === 'add' ? 'Добавить' : 'Сохранить'}</SaveButtonWithTooltip>
            <CancelButtonWithTooltip onClick={onCancel}>Отмена</CancelButtonWithTooltip>
          </div>
        )}
      </div>
    );
  }
}

export default ProductCard;