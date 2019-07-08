import React from "react";
import '../components/components.css'

// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    <div className="list-overflow-container col-lg-12" id="trainerholder">
{children}
    </div>
  );
}

export function ListItem({ children }, props) {
  return <div className="card" onClick={props.onClick}>{children}</div>;
}
