import React, { PureComponent } from "react";
import mobileEvents from "../Events";

class FilterButtons extends PureComponent {
  render() {
    console.log('FilterButtons render');

    return (
      <div>
        <button onClick={() => mobileEvents.emit('changeFilter', 'all')}>Все</button>
        <button onClick={() => mobileEvents.emit('changeFilter', 'active')}>Активные</button>
        <button onClick={() => mobileEvents.emit('changeFilter', 'blocked')}>Заблокированные</button>
      </div>
    );
  }
}

export default FilterButtons;