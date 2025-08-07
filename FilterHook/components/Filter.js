import React, { useState, useMemo, useCallback } from 'react';
import Controls from './Controls';
import List from './List';
import './Filter.css';

const Filter = ({ items }) => {
  const [filterText, setFilterText] = useState('');
  const [sortAlpha, setSortAlpha] = useState(false);

  const getFilteredItems = useCallback(() => {
    let result = items.filter(item =>
      item.toLowerCase().includes(filterText.toLowerCase())
    );
    if (sortAlpha) {
      result = result.slice().sort((a, b) => a.localeCompare(b));
    }
    return result;
  }, [items, filterText, sortAlpha]);

  const filteredItems = useMemo(() => getFilteredItems(), [getFilteredItems]);

  const handleTextChange = (e) => setFilterText(e.target.value);

  const handleCheckboxChange = (e) => setSortAlpha(e.target.checked);

  const handleReset = () => {
    setFilterText('');
    setSortAlpha(false);
  };

  return (
    <div className="filter-container">
      <Controls
        filterText={filterText}
        sortAlpha={sortAlpha}
        onTextChange={handleTextChange}
        onCheckboxChange={handleCheckboxChange}
        onReset={handleReset}
      />
      <List items={filteredItems} />
    </div>
  );
};

export default Filter;