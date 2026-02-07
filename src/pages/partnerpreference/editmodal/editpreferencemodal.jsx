import React, { useState, useEffect, useRef } from "react";
import "./Modal.css";
import { getUserFromToken } from "../../../Utils/JwtHelper";

const EditPreferenceModal = ({ 
  open, 
  onClose, 
  title, 
  value = "", 
  onSave, 
  saving = false,
  apiEndpoint = "/api/UserProfile/{userId}",
  idField = "id",
  labelField = "label",
  nameField = "name",
  dataField = null
}) => {
  const [inputValue, setInputValue] = useState(value ?? "");
  const [options, setOptions] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [optionsError, setOptionsError] = useState(null);
  const inputRef = useRef(null);
  const abortControllerRef = useRef(null);
  const Base_api = import.meta.env.VITE_BASE_URL;

  const userData = getUserFromToken();
  const userId = userData?.id || userData?.sub || userData?.userId;

  // Simple fetch with timeout
  const safeFetch = async (url, timeout = 10000) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const timeoutId = setTimeout(() => abortControllerRef.current.abort(), timeout);

    try {
      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(url, {
        signal: abortControllerRef.current.signal,
        headers,
        method: "GET",
      });

      clearTimeout(timeoutId);

      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const data = await res.json();
      if (!data) throw new Error("Empty response from server");
      return data;
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === "AbortError") throw new Error("Request timeout");
      if (err instanceof TypeError) throw new Error("Network error");
      throw err;
    }
  };

  // Sync with parent value changes
  useEffect(() => {
    setInputValue(value ?? "");
  }, [value]);

  // Extract options from API response
  const extractOptions = (data) => {
    let optionsData = dataField ? data[dataField] : data;

    if (!Array.isArray(optionsData)) {
      const commonFields = ["options", "data", "items", "preferences"];
      for (const field of commonFields) {
        if (Array.isArray(optionsData?.[field])) {
          optionsData = optionsData[field];
          break;
        }
      }
    }

    return Array.isArray(optionsData) ? optionsData : [];
  };

  // Fetch dropdown options
  useEffect(() => {
    if (!open || !userId) return;

    const fetchOptions = async () => {
      setOptionsLoading(true);
      setOptionsError(null);

      try {
        if (!Base_api) throw new Error("API Base URL not configured");

        let url = `${Base_api}${apiEndpoint}`;
        if (apiEndpoint.includes("{userId}")) {
          url = url.replace("{userId}", userId);
        }

        const data = await safeFetch(url, 10000);
        const optionsData = extractOptions(data);

        if (optionsData.length === 0) {
          setOptionsError("No options available");
          setOptions([]);
          return;
        }

        const mappedOptions = optionsData
          .map((option) => {
            const id = option[idField] || option.id || option._id;
            const label = option[labelField] || option[nameField] || option.name || option.title;

            if (!id || !label) return null;
            return {
              ...option,
              _id: String(id),
              _label: String(label),
            };
          })
          .filter(Boolean);

        setOptions(mappedOptions);
        if (mappedOptions.length === 0) setOptionsError("No valid options found");
      } catch (err) {
        setOptionsError(`Failed to load options: ${err.message}`);
        setOptions([]);
      } finally {
        setOptionsLoading(false);
      }
    };

    fetchOptions();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [open, apiEndpoint, idField, labelField, nameField, userId, Base_api, dataField]);

  if (!open) return null;

  const handleSave = () => {
    if (!userId || saving) return;
    if (typeof onSave === "function") {
      onSave(inputValue, userId, userData);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isSaveDisabled) handleSave();
    if (e.key === "Escape") onClose();
  };

  const isSaveDisabled = 
    saving || 
    optionsLoading ||
    String(inputValue) === String(value ?? "") || 
    !String(inputValue).trim();

  return (
    <div className="modal-backdrop" onKeyDown={handleKeyDown} tabIndex={-1}>
      <div className="modal-box" role="dialog" aria-modal="true" aria-label={title}>
        <h3>{title}</h3>

        {optionsError && (
          <div style={{ 
            background: "#fff3cd", 
            color: "#856404", 
            padding: "12px", 
            borderRadius: "4px", 
            marginBottom: "12px",
            border: "1px solid #ffc107",
            fontSize: "12px"
          }}>
            <strong>⚠️ {optionsError}</strong>
          </div>
        )}

        <select
          ref={inputRef}
          className="modal-input"
          value={String(inputValue)}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={saving || optionsLoading}
        >
          <option value="">
            {optionsLoading ? "Loading..." : "Select an option"}
          </option>
          {options.map((option) => (
            <option key={option._id} value={option._id}>
              {option._label}
            </option>
          ))}
        </select>

        <div className="modal-actions">
          <button 
            className="btn cancel" 
            onClick={onClose} 
            disabled={saving}
            type="button"
          >
            Cancel
          </button>
          <button
            className="btn save"
            onClick={handleSave}
            disabled={isSaveDisabled}
            type="button"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPreferenceModal;