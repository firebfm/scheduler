import React from "react";
import classnames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewerItemClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
    "interviewers__item-image": props.avatar
  });

  return (
    <li className={interviewerItemClass} onClick={() => props.setInterviewer(props.name)}>
    <img
      className={"interviewers__item-image"}
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}
  </li>
  );
}