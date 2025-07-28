import React, { PureComponent } from "react";
import mobileEvents from "../Events";

class FilterButtons extends React.PureComponent {
    render() {
        console.log('FilterButtons render');

        return React.createElement(
            'div',
            null,

            React.createElement('button', {
                onClick: () => mobileEvents.emit('changeFilter', 'all'),
            }, 'Все'),

            React.createElement('button', {
                onClick: () => mobileEvents.emit('changeFilter', 'active'),
            }, 'Активные'),
            
            React.createElement('button', {
                onClick: () => mobileEvents.emit('changeFilter', 'blocked'),
            }, 'Заблокированные')

        );
    }
}

export default FilterButtons;