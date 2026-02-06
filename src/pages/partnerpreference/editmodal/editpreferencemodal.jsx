import React, { useState, useEffect, useRef } from "react";
import "./Modal.css";

const EditPreferenceModal = ({ open, onClose, title, value = "", onSave, saving = false }) => {
  const [inputValue, setInputValue] = useState(value ?? "");
  const [options, setOptions] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [optionsError, setOptionsError] = useState(null);
  const inputRef = useRef(null);
  const Base_api = import.meta.env.VITE_BASE_URL;

  // Keep local state in sync if parent updates the value
  useEffect(() => {
    setInputValue(value ?? "");
  }, [value]);

  // Fetch dropdown options from API when modal opens
  useEffect(() => {
    if (open) {
      fetchOptions();
    }
  }, [open]);

  const fetchOptions = async () => {
    setOptionsLoading(true);
    setOptionsError(null);
    try {
      const res = await fetch(`${Base_api}/api/edit_preferences`);
      if (!res.ok) throw new Error("Failed to fetch options");
      const data = await res.json();
      
      // Adjust these field names based on your API response
      // If response is [{id: 1, label: 'Option1'}, ...], keep as is
      // If response is [{id: 1, name: 'Option1'}, ...], change 'label' to 'name'
      setOptions(Array.isArray(data) ? data : data.options || []);
    } catch (err) {
      console.error("Error fetching options:", err);
      setOptionsError(err.message);
    } finally {
      setOptionsLoading(false);
    }
  };

  if (!open) return null;

  const handleSave = () => {
    // prevent double save while already saving
    if (saving) return;
    if (typeof onSave === "function") {
      onSave(inputValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") onClose();
  };

  const isSaveDisabled = saving || inputValue === (value ?? "") || !String(inputValue).trim();

  return (
    <div className="modal-backdrop" onKeyDown={handleKeyDown} tabIndex={-1}>
      <div
        className="modal-box"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <h3>{title}</h3>

        {optionsError && <p style={{ color: "red", fontSize: "12px" }}>{optionsError}</p>}

        <select
          ref={inputRef}
          className="modal-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={saving || optionsLoading}
        >
          <option value="">
            {optionsLoading ? "Loading options..." : "Select an option"}
          </option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label || option.name}
            </option>
          ))}
        </select>

        <div className="modal-actions">
          <button className="btn cancel" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button
            className="btn save"
            onClick={handleSave}
            disabled={isSaveDisabled}
            aria-busy={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPreferenceModal;
