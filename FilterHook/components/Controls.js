import React from 'react';

const Controls = ({ filterText, sortAlpha, onTextChange, onSortChange, onReset }) => {
  const handleCheckboxChange = (e) => { onSortChange(e.target.checked); };
  const handleInputChange = (e) => { onTextChange(e.target.value); };

  return (
    <div className="filter-fields">
      <input type="checkbox" checked={sortAlpha} onChange={handleCheckboxChange} className="filter-checkbox"/>
      <input type="text" placeholder="Введите текст" value={filterText} onChange={handleInputChange}/>
      <button onClick={onReset}>Сброс</button>
    </div>
  );
};

export default Controls;