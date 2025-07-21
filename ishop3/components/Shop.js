import React from 'react';
import Product from './Product';
import './Shop.css';

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProductId: null,
      editedProductId: null,
      products: [],
      formState: null,
      formMode: null,
      formErrors: {},
      touchedFields: {},
      isDirty: false,
      showErrors: false,
    };
  }

  componentDidMount() {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => this.setState({ products: data }))
      .catch(err => console.error('Ошибка при загрузке продуктов:', err));
  }

  handleSelect = (id) => {
    const { formMode, isDirty } = this.state;
    if ((formMode === 'edit' || formMode === 'add') && isDirty) return;

    const product = this.state.products.find(p => p.id === id);

    this.setState({
      selectedProductId: id,
      editedProductId: null,
      formState: product,
      formMode: 'view',
      formErrors: {},
      touchedFields: {},
      isDirty: false,
      showErrors: false,
    });
  };

  handleDelete = (id) => {
    const product = this.state.products.find(p => p.id === id);
    if (!window.confirm(`Удалить товар "${product.name}"?`)) return;

    this.setState(({ products, selectedProductId }) => {
      const newProducts = products.filter(p => p.id !== id);
      const newSelectedId = selectedProductId === id ? null : selectedProductId;

      return {
        products: newProducts,
        selectedProductId: newSelectedId,
        formMode: null,
        formState: null,
        editedProductId: null,
        formErrors: {},
        touchedFields: {},
        isDirty: false,
        showErrors: false,
      };
    });
  };

  handleEdit = (id) => {
    const { formMode, isDirty } = this.state;
    if ((formMode === 'edit' || formMode === 'add') && isDirty) return;

    const product = this.state.products.find(p => p.id === id);

    this.setState({
      selectedProductId: id,
      editedProductId: id,
      formState: { ...product },
      formMode: 'edit',
      formErrors: {},
      touchedFields: {},
      isDirty: false,
      showErrors: false,
    });
  };

  handleAddNew = () => {
    this.setState({
      formMode: 'add',
      formState: { name: '', price: '', stock: '', imageUrl: '' },
      formErrors: {},
      touchedFields: {},
      isDirty: false,
      selectedProductId: null,
      editedProductId: null,
      showErrors: false,
    });
  };

  validateField = (field, value) => {
    switch(field) {
      case 'name':
        return !value || value.trim().length < 2 ? 'Заполните имя продукта (мин 2 символа)' : null;
      case 'price':
        return !value || isNaN(value) || +value <= 0 ? 'Цена должна быть положительным числом' : null;
      case 'stock':
        return value === '' || isNaN(value) || +value < 0 ? 'Остаток не может быть отрицательным' : null;
      case 'imageUrl':
        return !value || !/^https?:\/\//.test(value) ? 'Некорректный URL изображения' : null;
      default:
        return null;
    }
  };

  validate = (product) => {
    const errors = {};
    ['name', 'price', 'stock', 'imageUrl'].forEach(field => {
      const error = this.validateField(field, product[field]);
      if (error) errors[field] = error;
    });
    return errors;
  };

  handleChange = (field, value) => {
    this.setState(({ formState, formErrors, touchedFields }) => {
      const newFormState = { ...formState, [field]: value };
      const error = this.validateField(field, value);
      const newFormErrors = { ...formErrors, [field]: error };
      const newTouchedFields = { ...touchedFields, [field]: true };

      return {
        formState: newFormState,
        formErrors: newFormErrors,
        touchedFields: newTouchedFields,
        isDirty: true,
        showErrors: false,
      };
    });
  };

 isFormValid = () => {
  const { formErrors, formState } = this.state;
  const atLeastOneFieldFilled = formState && ['name', 'price', 'stock', 'imageUrl'].some(
    field => formState[field] !== undefined && formState[field].toString().trim() !== ''
  );
  const noErrors = formErrors && Object.values(formErrors).every(error => !error);

  return atLeastOneFieldFilled && noErrors;
};


  handleSave = () => {
    const { formState, products, formMode } = this.state;

    const errors = this.validate(formState);

    if (Object.keys(errors).length > 0) {
      this.setState({
        formErrors: errors,
        showErrors: true,
        touchedFields: { name: true, price: true, stock: true, imageUrl: true },
      });
      return;
    }

    this.setState({ showErrors: false, touchedFields: {} });

    if (formMode === 'edit') {
      const updatedProducts = products.map(p =>
        p.id === formState.id ? formState : p
      );

      this.setState({
        products: updatedProducts,
        formMode: 'view',
        isDirty: false,
        formErrors: {},
        editedProductId: null,
        selectedProductId: formState.id,
      });

    } else if (formMode === 'add') {
      const newProduct = { ...formState, id: Date.now() };

      this.setState({
        products: [...products, newProduct],
        formMode: null,
        selectedProductId: newProduct.id,
        formState: null,
        isDirty: false,
        formErrors: {},
        editedProductId: null,
      });
    }
  };

  handleCancel = () => {
    this.setState({
      formMode: null,
      editedProductId: null,
      selectedProductId: null,
      formState: null,
      formErrors: {},
      touchedFields: {},
      isDirty: false,
      showErrors: false,
    });
  };

  renderForm = () => {
    const { formState, formErrors, formMode, showErrors, touchedFields } = this.state;

    if (!formMode) return null;

    const isEditable = formMode === 'edit' || formMode === 'add';

    let headerText = '';
    if (formMode === 'add') {
      headerText = 'Добавление нового продукта';
    } else if (formMode === 'edit') {
      headerText = 'Редактирование продукта';
    } else if (formMode === 'view') {
      headerText = 'Просмотр продукта';
    }

    if (formMode === 'view') {
      return (
        <div className="ProductCard">
          <h2>{headerText}</h2>
          <p><strong>Название:</strong> {formState.name}</p>
          <p><strong>Цена:</strong> {formState.price} бел.руб</p>
          <p><strong>В наличии:</strong> {formState.stock}</p>
          <p><strong>Изображение:</strong></p>
          <img src={formState.imageUrl} alt={formState.name} style={{ maxWidth: '200px' }} />
        </div>
      );
    }

    return (
      <div className="ProductCard">
        <h2>{headerText}</h2>
        <div className="ProductFields">
          {['name', 'price', 'stock', 'imageUrl'].map(field => (
            <div key={field}>
              <label>{field}:</label>
              <input
                type="text"
                value={formState[field] || ''}
                onChange={e => this.handleChange(field, e.target.value)}
                disabled={!isEditable}
              />
              {(touchedFields[field] || showErrors) && formErrors[field] && (
                <span className="Error">{formErrors[field]}</span>
              )}
            </div>
          ))}
        </div>
        <button className="Save" onClick={this.handleSave} disabled={!this.isFormValid()}>
          Сохранить
        </button>
        <button className="Cancel" onClick={this.handleCancel}>Отмена</button>
      </div>
    );
  };

  render() {
    const { products, selectedProductId, formMode, isDirty } = this.state;
    const disableActions = (formMode === 'edit' || formMode === 'add') && isDirty;

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
            {products.map(product => (
              <Product
                key={product.id}
                product={product}
                isSelected={selectedProductId === product.id}
                onSelect={() => this.handleSelect(product.id)}
                onDelete={() => this.handleDelete(product.id)}
                onEdit={() => this.handleEdit(product.id)}
                isDisabled={disableActions}
              />
            ))}
          </tbody>
        </table>
        <button className="NewBtn" onClick={this.handleAddNew} disabled={disableActions}>Новый</button>
        {this.renderForm()}
      </div>
    );
  }
}

export default Shop;
