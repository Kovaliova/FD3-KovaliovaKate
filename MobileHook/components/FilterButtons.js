import React from "react";
import mobileEvents from "../Events";

const FilterButtons = React.memo(() => {
  console.log("FilterButtons render");

  return (
    <div>
      <button onClick={() => mobileEvents.emit("changeFilter", "all")}>Все</button>
      <button onClick={() => mobileEvents.emit("changeFilter", "active")}>Активные</button>
      <button onClick={() => mobileEvents.emit("changeFilter", "blocked")}>Заблокированные</button>
    </div>
  );
});

export default FilterButtons;