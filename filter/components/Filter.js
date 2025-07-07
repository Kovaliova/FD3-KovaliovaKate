import React from 'react';
import './Filter.css';

class Filter extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            filterText: '',
            sortAlpha: false,
            filteredItems: this.getFilteredItems(props.items, '', false),
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const propsChanged = prevProps.items !== this.props.items;
        const filterTextChanged = prevState.filterText !== this.state.filterText;
        const sortAlphaChanged = prevState.sortAlpha !== this.state.sortAlpha;

        if (propsChanged || filterTextChanged || sortAlphaChanged) {
            const filteredItems = this.getFilteredItems(
            this.props.items,
            this.state.filterText,
            this.state.sortAlpha
        );
        this.setState({ filteredItems });
        }
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

    handleTextChange = (e) => {
        this.setState({ filterText: e.target.value });
    }

    handleCheckboxChange = (e) => {
        this.setState({ sortAlpha: e.target.checked });
    }

    handleReset = () => {
        this.setState ({
            filterText: '',
            sortAlpha: false
        })
    }

    render(){
        const { filteredItems, filterText, sortAlpha } = this.state;

        return (
            <div className='filter-container'>
                <div className='filter-fields'>
                    <input 
                            type="checkbox"
                            checked={sortAlpha}
                            onChange={this.handleCheckboxChange}
                            className='filter-checkbox'
                    />
                    <input 
                        type="text" 
                        placeholder="Введите текст" 
                        value={filterText} 
                        onChange={this.handleTextChange}
                    />

                    <button onClick={this.handleReset}>Сброс</button>
                </div>
                <div className='filter-list-container'>
                    <ul className='filter-list'>
                        {filteredItems.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Filter;