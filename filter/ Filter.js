import React from 'react';
import './Filter.css';

class Filter extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            filterText: '',
            sortAlpha: false,
        };
    }

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
        const { items } = this.props;
        const { filterText, sortAlpha } = this.state;

        let filteredItems = items.filter ( item =>
            item.toLowerCase().includes(filterText.toLowerCase())
        );

        if(sortAlpha) {
            filteredItems = filteredItems.slice().sort((a,b) =>
                a.localeCompare(b)
            );
        }

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