import React from 'react';
import Controls from './Controls';
import List from './List';
import './Filter.css';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            sortAlpha: false,
            filteredItems: this.getFilteredItems(props.items, '', false),
        };
    }

    getFilteredItems = (items, filterText, sortAlpha) => {
        let result = items.filter(item =>
            item.toLowerCase().includes(filterText.toLowerCase())
        );
        if (sortAlpha) {
            result = result.slice().sort((a, b) => a.localeCompare(b));
        }
        return result;
    };

    updateFilteredItems = () => {
        const filteredItems = this.getFilteredItems(
            this.props.items,
            this.state.filterText,
            this.state.sortAlpha
        );
        this.setState({ filteredItems });
    };

    handleTextChange = (e) => {
        this.setState({ filterText: e.target.value }, this.updateFilteredItems);
    };

    handleCheckboxChange = (e) => {
        this.setState({ sortAlpha: e.target.checked }, this.updateFilteredItems);
    }

    handleReset = () => {
        this.setState(
            {
                filterText: '',
                sortAlpha: false,
            },
            this.updateFilteredItems
        );
    };

    render() {
        const { filterText, sortAlpha, filteredItems } = this.state;

        return (
            <div className="filter-container">
                <Controls
                    filterText={filterText}
                    sortAlpha={sortAlpha}
                    onTextChange={this.handleTextChange}
                    onCheckboxChange={this.handleCheckboxChange}
                    onReset={this.handleReset}
                />
                <List items={filteredItems} />
            </div>
        );
    }
}

export default Filter;
