import React, { useState } from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import { renderMarkdownToHtml } from "../../utlis/markdownUtils";
import "./MarkdownEditor.scss";

const MarkdownEditor = ({
  value,
  onChange,
  onBlur,
  onPaste,
  placeholder,
  name,
  id,
  rows = 8,
  error,
  touched,
  disabled = false,
  showPreview = true,
  maxLength,
}) => {
  const [activeTab, setActiveTab] = useState("edit");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="markdown-editor">
      {showPreview && (
        <div className="editor-tabs">
          <button
            type="button"
            className={`tab-button ${activeTab === "edit" ? "active" : ""}`}
            onClick={() => handleTabChange("edit")}
          >
            <FiEdit /> Edit
          </button>
          <button
            type="button"
            className={`tab-button ${activeTab === "preview" ? "active" : ""}`}
            onClick={() => handleTabChange("preview")}
          >
            <FiEye /> Preview
          </button>
        </div>
      )}

      <div className="editor-content">
        {activeTab === "edit" ? (
          <textarea
            id={id}
            name={name}
            rows={rows}
            className={`markdown-textarea ${error && touched ? "error" : ""}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onPaste={onPaste}
            disabled={disabled}
          />
        ) : (
          <div className="markdown-preview">
            {value ? (
              <div
                className="preview-content"
                dangerouslySetInnerHTML={{
                  __html: renderMarkdownToHtml(value),
                }}
              />
            ) : (
              <div className="preview-empty">
                <p>No content to preview</p>
                <small>Start typing in the Edit tab to see the preview</small>
              </div>
            )}
          </div>
        )}
      </div>

      {error && touched && <div className="editor-error">{error}</div>}

      {maxLength && (
        <div className="character-counter">
          <small>
            {value ? value.length : 0} / {maxLength} ký tự
            {value && value.length > maxLength * 0.9 && (
              <span className="warning"> (Gần đạt giới hạn)</span>
            )}
          </small>
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;
