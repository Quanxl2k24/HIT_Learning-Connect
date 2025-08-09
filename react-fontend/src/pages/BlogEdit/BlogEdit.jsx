import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { FiArrowLeft, FiUpload, FiX } from "react-icons/fi";

import SideBar from "../../components/SideBar/SideBar";
import BoxNotification from "../../components/BoxNotificaton/BoxNotifiacation";
import { blogUpdateSchema } from "../../utlis/blogUpdateSchema";
import {
  parseTagsFromString,
  formatTagsForRequest,
} from "../../utlis/blogUtils";
import useUploadFile from "../../hooks/useUploadFile";
import {
  fetchBlogById,
  updateBlog,
  clearErrors,
  loadCachedData,
} from "../../redux/blog/blogActions";

import "./BlogEdit.scss";

const BlogEdit = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentBlog, blogDetailLoading, updateLoading, error } = useSelector(
    (state) => state.blog
  );

  const profileUser = useSelector((state) => state.user.profile);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [notificationStatus, setNotificationStatus] = useState("");
  const [currentFile, setCurrentFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [removeCurrentFile, setRemoveCurrentFile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { uploadFile, uploading, uploadError } = useUploadFile();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      tags: "",
    },
    validationSchema: blogUpdateSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        let fileUrl = currentBlog?.fileUrl;

        // Handle file upload
        if (currentFile) {
          const uploadResult = await uploadFile(currentFile);
          if (uploadResult?.fileUrl) {
            fileUrl = uploadResult.fileUrl;
          } else {
            setNotificationText("Failed to upload file. Please try again.");
            setNotificationStatus("error");
            setShowNotification(true);
            setIsSubmitting(false);
            return;
          }
        } else if (removeCurrentFile) {
          fileUrl = null;
        }

        const updateData = {
          title: values.title.trim(),
          description: values.description.trim(),
          tags: formatTagsForRequest(values.tags),
          fileUrl: fileUrl,
        };

        const result = await dispatch(updateBlog(blogId, updateData));
        if (result.success) {
          setNotificationText("Blog updated successfully");
          setNotificationStatus("success");
          setShowNotification(true);

          setTimeout(() => {
            navigate(`/Blog/${blogId}`);
          }, 1500);
        }
        setIsSubmitting(false);
      } catch {
        setNotificationText(
          "An error occurred while updating the blog. Please try again."
        );
        setNotificationStatus("error");
        setShowNotification(true);
        setIsSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (!blogId) {
      navigate("/Blog");
      return;
    }

    // Load cached data first if we don't have current blog
    if (!currentBlog) {
      dispatch(loadCachedData());
    }

    // Load blog details with smart caching
    dispatch(fetchBlogById(blogId, false)); // false = use cache if available

    // Clear any previous success state
    dispatch(clearErrors());
  }, [dispatch, blogId, navigate, currentBlog]);

  useEffect(() => {
    if (currentBlog && !blogDetailLoading) {
      // Check if user can edit this blog
      if (
        currentBlog.author !== profileUser?.username &&
        profileUser?.roleName !== "ROLE_ADMIN"
      ) {
        setNotificationText("You don't have permission to edit this blog.");
        setNotificationStatus("error");
        setShowNotification(true);
        setTimeout(() => {
          navigate(`/Blog/${blogId}`);
        }, 2000);
        return;
      }

      // Set form values
      formik.setValues({
        title: currentBlog.title || "",
        description: currentBlog.description || "",
        tags: parseTagsFromString(currentBlog.tags || ""),
      });

      // Set file preview if exists
      if (currentBlog.fileUrl) {
        setFilePreview(currentBlog.fileUrl);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBlog, blogDetailLoading, profileUser, navigate, blogId]);

  useEffect(() => {
    if (error && !blogDetailLoading && !updateLoading) {
      setNotificationText(error);
      setNotificationStatus("error");
      setShowNotification(true);
      dispatch(clearErrors());
    }
  }, [error, blogDetailLoading, updateLoading, dispatch]);

  useEffect(() => {
    if (uploadError) {
      setNotificationText(uploadError);
      setNotificationStatus("error");
      setShowNotification(true);
    }
  }, [uploadError]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCurrentFile(file);
      setRemoveCurrentFile(false);

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setFilePreview(previewUrl);
    }
  };

  const handleRemoveFile = () => {
    setCurrentFile(null);
    setFilePreview(null);
    setRemoveCurrentFile(true);

    // Clear file input
    const fileInput = document.getElementById("file-upload");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleRemoveExistingFile = () => {
    setRemoveCurrentFile(true);
    setFilePreview(null);
    setCurrentFile(null);
  };

  const isImageFile = (url) => {
    if (!url) return false;
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
    const lowerUrl = url.toLowerCase();
    return imageExtensions.some((ext) => lowerUrl.includes(ext));
  };

  const getFileName = (url) => {
    if (!url) return "";
    try {
      const urlParts = url.split("/");
      return urlParts[urlParts.length - 1];
    } catch {
      return "attachment";
    }
  };

  if (blogDetailLoading) {
    return (
      <div className="blog-edit-container">
        <div className="blog-edit">
          <div className="blog-edit-left">
            <SideBar />
          </div>
          <div className="blog-edit-right">
            <div className="loading">Loading blog details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentBlog) {
    return (
      <div className="blog-edit-container">
        <div className="blog-edit">
          <div className="blog-edit-left">
            <SideBar />
          </div>
          <div className="blog-edit-right">
            <div className="error">Blog not found</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-edit-container">
      <div className="blog-edit">
        <div className="blog-edit-left">
          <SideBar />
        </div>
        <div className="blog-edit-right">
          <div className="blog-edit-header">
            <button
              type="button"
              className="back-btn"
              onClick={() => navigate(`/Blog/${blogId}`)}
            >
              <FiArrowLeft />
              Back to Blog
            </button>
          </div>

          <div className="blog-edit-content">
            <h2 className="page-title">Edit Blog Post</h2>

            <form onSubmit={formik.handleSubmit} className="blog-form">
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className={`form-input ${
                    formik.touched.title && formik.errors.title ? "error" : ""
                  }`}
                  placeholder="Enter blog title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="error-message">{formik.errors.title}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="8"
                  className={`form-textarea ${
                    formik.touched.description && formik.errors.description
                      ? "error"
                      : ""
                  }`}
                  placeholder="Enter blog description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="error-message">
                    {formik.errors.description}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="tags" className="form-label">
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  className={`form-input ${
                    formik.touched.tags && formik.errors.tags ? "error" : ""
                  }`}
                  placeholder="Enter tags separated by commas (e.g. technology, programming, web)"
                  value={formik.values.tags}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.tags && formik.errors.tags && (
                  <div className="error-message">{formik.errors.tags}</div>
                )}
                <div className="form-help">
                  Separate multiple tags with commas
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Attachment</label>

                {/* Current file display */}
                {filePreview && !removeCurrentFile && (
                  <div className="current-file">
                    <div className="file-preview">
                      {isImageFile(filePreview) ? (
                        <div className="image-preview">
                          <img src={filePreview} alt="Preview" />
                          <button
                            type="button"
                            className="remove-preview"
                            onClick={
                              currentFile
                                ? handleRemoveFile
                                : handleRemoveExistingFile
                            }
                          >
                            <FiX />
                          </button>
                        </div>
                      ) : (
                        <div className="file-info">
                          <span className="file-name">
                            {getFileName(filePreview)}
                          </span>
                          <button
                            type="button"
                            className="remove-file-btn"
                            onClick={
                              currentFile
                                ? handleRemoveFile
                                : handleRemoveExistingFile
                            }
                          >
                            <FiX />
                          </button>
                        </div>
                      )}
                    </div>
                    {!currentFile && (
                      <p className="current-file-note">Current attachment</p>
                    )}
                  </div>
                )}

                {/* File upload */}
                <div className="file-upload-section">
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*,.pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                    className="file-input"
                  />
                  <label htmlFor="file-upload" className="file-upload-btn">
                    <FiUpload />
                    {filePreview && !removeCurrentFile
                      ? "Change File"
                      : "Choose File"}
                  </label>
                  <div className="file-help">
                    Supported formats: Images, PDF, DOC, DOCX, TXT (Max 10MB)
                  </div>
                </div>

                {uploading && (
                  <div className="uploading-status">
                    <div className="uploading-text">Uploading file...</div>
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => navigate(`/Blog/${blogId}`)}
                  disabled={updateLoading || isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={
                    updateLoading ||
                    uploading ||
                    isSubmitting ||
                    !formik.isValid
                  }
                >
                  {updateLoading || isSubmitting
                    ? "Updating..."
                    : "Update Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showNotification && (
        <BoxNotification
          message={notificationText}
          status={notificationStatus}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default BlogEdit;
