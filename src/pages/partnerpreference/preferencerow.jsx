import React, { useState } from "react";
import EditPreferenceModal from "../partnerpreference/editmodal/editpreferencemodal.jsx";
import { updatePreference } from "../partnerpreference/preferencesapi";

const PreferenceRow = ({ label, value, field }) => {
  const [open, setOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [saving, setSaving] = useState(false);

  const handleSave = async (newValue) => {
    try {
      setSaving(true);
      await updatePreference({ field, value: newValue });
      setCurrentValue(newValue);
      setOpen(false);
      // minimal feedback for now
      alert("Preference saved.");
    } catch (err) {
      console.error("Failed to save preference", err);
      alert("Failed to save preference. Please try again.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <>
      <div className="pp-row">
        <div>
          {label && <span className="pp-label">{label}</span>}
          <p className="pp-value">{currentValue}</p>
        </div>
        <span className="pp-edit" onClick={() => setOpen(true)}>✏️</span>
      </div>

      <EditPreferenceModal
        open={open}
        onClose={() => setOpen(false)}
        title={`Edit ${label}`}
        value={currentValue}
        onSave={handleSave}
        saving={saving}
      />
    </>
  );
};

export default PreferenceRow;
