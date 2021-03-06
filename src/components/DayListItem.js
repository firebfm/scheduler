import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayItemClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  // destructure
  // const {name, spots} = props;

  const formatSpots = () => {
    if (props.spots === 0) {
      return 'no spots remaining'
    } else if (props.spots === 1) {
      return '1 spot remaining'
      } else if (props.spots) {
        return `${props.spots} spots remaining`
      }
    };

  return (
    <li className={dayItemClass} data-testid="day" onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}