import React from 'react';

const Controls = ({ filterText, sortAlpha, onTextChange, onCheckboxChange, onReset }) => {
  return (
    <div className="filter-fields">
      <input
        type="checkbox"
        checked={sortAlpha}
        onChange={onCheckboxChange}
        className="filter-checkbox"
      />
      <input
        type="text"
        placeholder="Введите текст"
        value={filterText}
        onChange={onTextChange}
      />
      <button onClick={onReset}>Сброс</button>
    </div>
  );
};

export default Controls;