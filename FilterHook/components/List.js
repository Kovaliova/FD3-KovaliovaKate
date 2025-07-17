import React from 'react';

class List extends React.Component {
  render() {
    const { items } = this.props;

    return (
      <div className='filter-list-container'>
        <ul className='filter-list'>
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default List;
