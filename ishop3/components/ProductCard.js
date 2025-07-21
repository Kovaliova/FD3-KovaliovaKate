import React from 'react';

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

    const isValid = !formErrors || Object.keys(formErrors).length === 0;

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
            <button onClick={onSave} disabled={!isValid}>
              {formMode === 'add' ? 'Добавить' : 'Сохранить'}
            </button>
            <button onClick={onCancel}>Отмена</button>
          </div>
        )}
      </div>
    );
  }
}

export default ProductCard;
