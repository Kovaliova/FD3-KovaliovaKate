import React from 'react';

class Controls extends React.Component {
    render() {
        const {
            filterText,
            sortAlpha,
            onTextChange,
            onCheckboxChange,
            onReset,
        } = this.props;

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
    }
}

export default Controls;
