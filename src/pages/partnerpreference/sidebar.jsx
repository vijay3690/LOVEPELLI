import React from "react";

const Sidebar = () => {
  return (
    <div className="pp-sidebar">
      <h4>PARTNER PREFERENCES</h4>
      <ul>
        <li className="side-nav-item active">
         <a href="#basic-preferences">Basic</a>
        </li>
        <li><a href="#religious-preferences">Religious</a></li>
        <li><a href="#professional-preferences">Professional</a></li>
        <li><a href="#location-preferences">Location</a></li>
        <li><a href="#what-we-are-looking-for">About My Partner</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
