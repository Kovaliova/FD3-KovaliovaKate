import React from 'react';

const List = ({ items }) => {
  return (
    <div className="filter-list-container">
      <ul className="filter-list">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default List;