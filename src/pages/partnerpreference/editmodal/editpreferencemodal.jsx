import React, { useState, useEffect, useRef } from "react";
import "./Modal.css";

const EditPreferenceModal = ({ open, onClose, title, value = "", onSave, saving = false }) => {
  const [inputValue, setInputValue] = useState(value ?? "");
  const inputRef = useRef(null);

  // Keep local state in sync if parent updates the value
  useEffect(() => {
    setInputValue(value ?? "");
  }, [value]);

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      // slight delay ensures element is mounted
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

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

        <input
          ref={inputRef}
          className="modal-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={saving}
        />

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
