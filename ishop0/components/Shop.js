import React from 'react';

import './Shop.css';

class Shop extends React.Component {

  render() {
    return (
      <div className='Shop'>
          <h1>Магазин: {this.props.name}</h1>
          <p>Адрес: {this.props.address}</p>
      </div>
    );
  }

}

export default Shop;
