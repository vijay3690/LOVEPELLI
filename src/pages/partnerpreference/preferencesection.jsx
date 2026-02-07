import React from "react";
import PreferenceRow from "./preferencerow";

const PreferenceSection = ({ title, data }) => {
  const id = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <div id={id} className="pp-section">
      <h3>{title}</h3>
      {data.map((item, index) => (
        <PreferenceRow
          key={index}
          label={item.label}
          value={item.value}
        />
      ))}
    </div>
  );
};

export default PreferenceSection;
