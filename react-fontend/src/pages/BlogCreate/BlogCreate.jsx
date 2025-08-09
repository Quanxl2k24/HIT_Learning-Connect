import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { FiUpload, FiX, FiSave, FiArrowLeft, FiFile } from "react-icons/fi";
import SideBar from "../../components/SideBar/SideBar";
import BoxNotification from "../../components/BoxNotificaton/BoxNotifiacation";
import { createBlog } from "../../redux/blog/blogActions";
import useUploadFile from "../../hooks/useUploadFile";
import blogCreateSchema from "../../utlis/blogCreateSchema";
import {
  parseAndValidateTags,
  formatTagsForDisplay,
  isImageFile,
  formatFileSize,
} from "../../utlis/blogUtils";
import "./BlogCreate.scss";

const BlogCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uploadFile } = useUploadFile();
  const fileInputRef = useRef(null);

  // Local state
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [notificationStatus, setNotificationStatus] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [validTags, setValidTags] = useState([]);
  const [tagError, setTagError] = useState("");

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      tags: "",
      urlFile: "",
    },
    validationSchema: blogCreateSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);

      try {
        const blogData = {
          ...values,
          tags: validTags.join(" "), // Convert tags array to space-separated string
        };

        const result = await dispatch(createBlog(blogData));

        if (result.success) {
          setNotificationText("Tạo bài viết thành công!");
          setNotificationStatus("success");
          setShowNotification(true);

          // Navigate to blog list after short delay
          setTimeout(() => {
            navigate("/Blog");
          }, 1500);
        } else {
          setNotificationText(result.error || "Tạo bài viết thất bại!");
          setNotificationStatus("error");
          setShowNotification(true);
        }
      } catch {
        setNotificationText("Có lỗi xảy ra khi tạo bài viết!");
        setNotificationStatus("error");
        setShowNotification(true);
      }

      setIsSubmitting(false);
    },
  });

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const result = await uploadFile(file);

      if (result.success) {
        setUploadedFile({
          name: result.data.fileName,
          url: result.data.fileUrl,
          size: result.data.fileSize,
          type: result.data.fileType,
        });
        formik.setFieldValue("urlFile", result.data.fileUrl);
        setNotificationText("Upload file thành công!");
        setNotificationStatus("success");
        setShowNotification(true);
      } else {
        setNotificationText(result.error || "Upload file thất bại!");
        setNotificationStatus("error");
        setShowNotification(true);
      }
    } catch {
      setNotificationText("Có lỗi xảy ra khi upload file!");
      setNotificationStatus("error");
      setShowNotification(true);
    }

    setIsUploading(false);

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    formik.setFieldValue("urlFile", "");
  };

  const handleTagInputChange = (e) => {
    const value = e.target.value;
    setTagInput(value);

    if (value.trim()) {
      const { valid, invalid } = parseAndValidateTags(value);
      setValidTags(valid);

      if (invalid.length > 0) {
        setTagError(`Tags không hợp lệ: ${invalid.join(", ")}`);
      } else {
        setTagError("");
      }

      formik.setFieldValue("tags", value);
    } else {
      setValidTags([]);
      setTagError("");
      formik.setFieldValue("tags", "");
    }
  };

  const handleBack = () => {
    navigate("/Blog");
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
    setNotificationText("");
    setNotificationStatus(null);
  };

  return (
    <div className="blog-create-container">
      <div className="blog-create">
        <div className="blog-create-left">
          <SideBar />
        </div>

        <div className="blog-create-right">
          <div className="blog-create-header">
            <button onClick={handleBack} className="back-btn">
              <FiArrowLeft /> Quay lại
            </button>
            <h1>Tạo bài viết mới</h1>
          </div>

          <form onSubmit={formik.handleSubmit} className="blog-create-form">
            {/* Title */}
            <div className="form-group">
              <label htmlFor="title">Tiêu đề *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Nhập tiêu đề bài viết..."
                className={
                  formik.touched.title && formik.errors.title ? "error" : ""
                }
              />
              {formik.touched.title && formik.errors.title && (
                <div className="error-message">{formik.errors.title}</div>
              )}
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description">Nội dung *</label>
              <textarea
                id="description"
                name="description"
                rows="10"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Nhập nội dung bài viết..."
                className={
                  formik.touched.description && formik.errors.description
                    ? "error"
                    : ""
                }
              />
              {formik.touched.description && formik.errors.description && (
                <div className="error-message">{formik.errors.description}</div>
              )}
            </div>

            {/* Tags */}
            <div className="form-group">
              <label htmlFor="tags">Tags *</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={tagInput}
                onChange={handleTagInputChange}
                placeholder="Nhập tags (phân cách bằng dấu cách). Ví dụ: javascript react nodejs..."
                className={
                  formik.touched.tags && formik.errors.tags ? "error" : ""
                }
              />
              {validTags.length > 0 && (
                <div className="tags-preview">
                  <strong>Tags:</strong> {formatTagsForDisplay(validTags)}
                </div>
              )}
              {tagError && <div className="error-message">{tagError}</div>}
              {formik.touched.tags && formik.errors.tags && (
                <div className="error-message">{formik.errors.tags}</div>
              )}
              <div className="help-text">
                Hỗ trợ chữ cái, số, dấu gạch ngang và gạch dưới. Tối đa 10 tags.
              </div>
            </div>

            {/* File Upload */}
            <div className="form-group">
              <label>File đính kèm (tùy chọn)</label>

              {!uploadedFile ? (
                <div className="file-upload">
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="upload-btn"
                  >
                    <FiUpload />
                    {isUploading ? "Đang upload..." : "Chọn file"}
                  </button>
                  <div className="upload-help">
                    Hỗ trợ: PDF, Word, PowerPoint, Excel, hình ảnh. Tối đa 10MB.
                  </div>
                </div>
              ) : (
                <div className="uploaded-file">
                  <div className="file-info">
                    <FiFile />
                    <div className="file-details">
                      <div className="file-name">{uploadedFile.name}</div>
                      <div className="file-size">
                        {formatFileSize(uploadedFile.size)}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="remove-file-btn"
                    title="Xóa file"
                  >
                    <FiX />
                  </button>
                </div>
              )}

              {uploadedFile && isImageFile(uploadedFile.url) && (
                <div className="file-preview">
                  <img src={uploadedFile.url} alt="Preview" />
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="form-actions">
              <button
                type="button"
                onClick={handleBack}
                className="cancel-btn"
                disabled={isSubmitting}
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={
                  isSubmitting || !formik.isValid || validTags.length === 0
                }
                className="submit-btn"
              >
                <FiSave />
                {isSubmitting ? "Đang tạo..." : "Tạo bài viết"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Notification */}
      {showNotification && (
        <BoxNotification
          text={notificationText}
          status={notificationStatus}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
};

export default BlogCreate;
