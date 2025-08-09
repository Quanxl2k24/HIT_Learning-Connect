import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import {
  FiArrowLeft,
  FiEdit,
  FiTrash2,
  FiCalendar,
  FiUser,
  FiTag,
  FiFile,
  FiDownload,
  FiMessageCircle,
  FiSend,
  FiMoreHorizontal,
} from "react-icons/fi";
import SideBar from "../../components/SideBar/SideBar";
import BoxNotification from "../../components/BoxNotificaton/BoxNotifiacation";
import BoxConfirmDelete from "../../components/BoxConfrimDelete/BoxConfirmDelete";
import {
  fetchBlogById,
  deleteBlog,
  fetchCommentsByBlogId,
  createComment,
  updateComment,
  deleteComment,
  dropReaction,
  fetchReactionStats,
  fetchMyReaction,
  clearErrors,
} from "../../redux/blog/blogActions";
import { fetchUser } from "../../redux/user/userActions";
import {
  formatDate,
  getRelativeTime,
  isImageFile,
  getReactionEmoji,
  getReactionDisplayName,
  getFileName,
} from "../../utlis/blogUtils";
import { renderMarkdownToHtml } from "../../utlis/markdownUtils";
import commentSchema from "../../utlis/commentSchema";
import "./BlogDetails.scss";

const BlogDetails = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const dispatch = useDispatch();

  // Debug URL params
  console.log("URL params blogId:", blogId);
  console.log("URL params blogId type:", typeof blogId);

  // Redux state
  const {
    currentBlog,
    comments,
    totalComments,
    reactionStats,
    myReactions,
    blogDetailLoading,
    commentsLoading,
    reactionsLoading,
    deleteLoading,
    error,
  } = useSelector((state) => state.blog);

  // Debug logging
  console.log("Component comments state:", comments);
  console.log("Component totalComments:", totalComments);
  console.log("Component commentsLoading:", commentsLoading);

  const profileUser = useSelector((state) => state.user.profile);
  const isAdmin = profileUser?.roleName !== "ROLE_USER";

  // Local state
  const [showDeleteBlog, setShowDeleteBlog] = useState(false);
  const [showDeleteComment, setShowDeleteComment] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [notificationStatus, setNotificationStatus] = useState(null);
  const [openMenuCommentId, setOpenMenuCommentId] = useState(null);

  // Comment form
  const commentFormik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: commentSchema,
    onSubmit: async (values, { resetForm }) => {
      const commentData = {
        blogId: parseInt(blogId),
        content: values.content.trim(),
      };

      const result = await dispatch(createComment(commentData));
      if (result.success) {
        resetForm();
        setNotificationText("Bình luận đã được thêm!");
        setNotificationStatus("success");
        setShowNotification(true);
        // Refresh comments
        dispatch(fetchCommentsByBlogId(blogId));
      } else {
        setNotificationText(result.error || "Thêm bình luận thất bại!");
        setNotificationStatus("error");
        setShowNotification(true);
      }
    },
  });

  // Edit comment form
  const editCommentFormik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: commentSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const result = await dispatch(
        updateComment(editingComment.id, values.content.trim())
      );
      if (result.success) {
        setEditingComment(null);
        setNotificationText("Bình luận đã được cập nhật!");
        setNotificationStatus("success");
        setShowNotification(true);
        // Refresh comments
        dispatch(fetchCommentsByBlogId(blogId));
      } else {
        setNotificationText(result.error || "Cập nhật bình luận thất bại!");
        setNotificationStatus("error");
        setShowNotification(true);
      }
    },
  });

  useEffect(() => {
    if (!blogId) {
      navigate("/Blog");
      return;
    }

    // Ensure user profile is loaded
    if (!profileUser) {
      dispatch(fetchUser());
    }

    // Load initial data
    dispatch(fetchBlogById(blogId, false));
    dispatch(fetchCommentsByBlogId(blogId));
    dispatch(fetchReactionStats(blogId));
    dispatch(fetchMyReaction(blogId));
  }, [dispatch, blogId, navigate, profileUser]); // Added profileUser to dependencies

  // Debug permission checking
  useEffect(() => {
    console.log("=== PERMISSION DEBUG ===");
    console.log("ProfileUser:", profileUser);
    console.log("CurrentBlog:", currentBlog);
    console.log("CurrentBlog.author:", currentBlog?.author);
    console.log("IsAdmin:", isAdmin);
    console.log(
      "Can edit/delete?",
      isAdmin || currentBlog?.author === profileUser?.username
    );
    console.log("ShowDeleteBlog state:", showDeleteBlog);
  }, [profileUser, currentBlog, isAdmin, showDeleteBlog]);

  useEffect(() => {
    if (editingComment) {
      editCommentFormik.setValues({
        content: editingComment.content || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingComment]);

  useEffect(() => {
    if (error && !blogDetailLoading && notificationStatus !== "success") {
      setNotificationText(error);
      setNotificationStatus("error");
      setShowNotification(true);
      dispatch(clearErrors());
    }
  }, [error, blogDetailLoading, notificationStatus, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuCommentId && !event.target.closest(".comment-actions")) {
        setOpenMenuCommentId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openMenuCommentId]);

  const handleBack = () => {
    navigate("/Blog");
  };

  const handleEdit = () => {
    navigate(`/Blog/${blogId}/Edit`);
  };

  const handleDeleteBlog = async () => {
    console.log("=== DELETE BLOG DEBUG START ===");
    console.log("BlogId:", blogId);
    console.log("BlogId type:", typeof blogId);
    console.log("ProfileUser:", profileUser);
    console.log("IsAdmin:", isAdmin);
    console.log("CurrentBlog author:", currentBlog?.author);
    console.log(
      "Can delete?",
      isAdmin || currentBlog?.author === profileUser?.username
    );

    // Validate blogId
    if (!blogId || blogId === "undefined" || blogId === "null") {
      console.error("Invalid blogId:", blogId);
      setNotificationText("ID bài viết không hợp lệ!");
      setNotificationStatus("error");
      setShowNotification(true);
      setShowDeleteBlog(false);
      return;
    }

    try {
      const result = await dispatch(deleteBlog(blogId));
      console.log("=== DELETE RESULT RECEIVED ===");
      console.log("Full result object:", result);
      console.log("result.success:", result?.success);
      console.log("result.error:", result?.error);

      if (result && result.success) {
        console.log("Delete successful - showing success notification");
        setNotificationText("Xóa bài viết thành công!");
        setNotificationStatus("success");
        setShowNotification(true);
        setTimeout(() => {
          navigate("/Blog");
        }, 1500);
      } else {
        console.error("=== DELETE FAILED ===");
        console.error("Full result:", result);
        const errorMessage = result?.error || "Xóa bài viết thất bại!";
        console.error("Error message to show:", errorMessage);
        setNotificationText(errorMessage);
        setNotificationStatus("error");
        setShowNotification(true);
      }
    } catch (error) {
      console.error("=== DELETE CATCH ERROR ===");
      console.error("Caught error:", error);
      setNotificationText("Có lỗi xảy ra khi xóa bài viết!");
      setNotificationStatus("error");
      setShowNotification(true);
    }

    setShowDeleteBlog(false);
  };

  const handleConfirmDeleteComment = async () => {
    if (commentToDelete) {
      const result = await dispatch(deleteComment(commentToDelete.id));
      if (result.success) {
        setNotificationText("Xóa bình luận thành công!");
        setNotificationStatus("success");
        setShowNotification(true);
        // Refresh comments
        dispatch(fetchCommentsByBlogId(blogId));
      } else {
        setNotificationText(result.error || "Xóa bình luận thất bại!");
        setNotificationStatus("error");
        setShowNotification(true);
      }
    }
    setShowDeleteComment(false);
    setCommentToDelete(null);
  };

  const handleReaction = async (reactionType) => {
    const reactionData = {
      blogId: parseInt(blogId),
      type: reactionType,
    };

    await dispatch(dropReaction(reactionData));
    // Refresh reaction stats and user reaction
    dispatch(fetchReactionStats(blogId));
    dispatch(fetchMyReaction(blogId));
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setOpenMenuCommentId(null); // Close menu when editing
  };

  const handleCancelEditComment = () => {
    setEditingComment(null);
  };

  const toggleCommentMenu = (commentId) => {
    setOpenMenuCommentId(openMenuCommentId === commentId ? null : commentId);
  };

  const handleDeleteCommentClick = (comment) => {
    setCommentToDelete(comment);
    setShowDeleteComment(true);
    setOpenMenuCommentId(null); // Close menu when deleting
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
    setNotificationText("");
    setNotificationStatus(null);
  };

  const canEditComment = (comment) => {
    return comment.username === profileUser?.username;
  };

  // Validate blogId
  if (!blogId) {
    return (
      <div className="blog-details-container">
        <div className="blog-details">
          <div className="blog-details-left">
            <SideBar />
          </div>
          <div className="blog-details-right">
            <div className="error">Invalid blog ID</div>
          </div>
        </div>
      </div>
    );
  }

  const canDeleteComment = (comment) => {
    // Blog author or comment owner can delete
    const canDelete =
      currentBlog?.author === profileUser?.username ||
      comment.username === profileUser?.username ||
      isAdmin;
    return canDelete;
  };

  if (blogDetailLoading && !currentBlog) {
    return (
      <div className="blog-details-container">
        <div className="blog-details">
          <div className="blog-details-left">
            <SideBar />
          </div>
          <div className="blog-details-right">
            <div className="loading">Đang tải...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentBlog) {
    return (
      <div className="blog-details-container">
        <div className="blog-details">
          <div className="blog-details-left">
            <SideBar />
          </div>
          <div className="blog-details-right">
            <div className="error">Không tìm thấy bài viết</div>
          </div>
        </div>
      </div>
    );
  }

  const blogReactionStats = reactionStats[blogId] || {};
  const myReaction = myReactions[blogId];
  const reactionTypes = ["LIKE", "LOVE", "HAHA", "WOW", "SAD", "ANGRY"];

  return (
    <div className="blog-details-container">
      <div className="blog-details">
        <div className="blog-details-left">
          <SideBar />
        </div>

        <div className="blog-details-right">
          <div className="blog-details-header">
            <button onClick={handleBack} className="back-btn">
              <FiArrowLeft /> Quay lại
            </button>

            {(isAdmin || currentBlog.author === profileUser?.username) && (
              <div className="blog-actions">
                <button onClick={handleEdit} className="action-btn edit-btn">
                  <FiEdit /> Chỉnh sửa
                </button>
                <button
                  onClick={() => {
                    console.log("=== DELETE BUTTON CLICKED ===");
                    console.log("Showing delete confirmation");
                    setShowDeleteBlog(true);
                  }}
                  className="action-btn delete-btn"
                  disabled={deleteLoading}
                >
                  <FiTrash2 /> Xóa
                </button>
              </div>
            )}
          </div>

          <div className="content-conatiner">
            <div className="blog-content">
              {/* Blog Info */}
              <div className="blog-info">
                <h1 className="blog-title">{currentBlog.title}</h1>

                <div className="blog-meta">
                  <span className="blog-author">
                    <FiUser /> {currentBlog.author}
                  </span>
                  <span className="blog-date">
                    <FiCalendar /> {formatDate(currentBlog.createdAt)}
                  </span>
                  {currentBlog.updatedAt !== currentBlog.createdAt && (
                    <span className="blog-updated">
                      (Cập nhật: {getRelativeTime(currentBlog.updatedAt)})
                    </span>
                  )}
                </div>

                {currentBlog.tags && currentBlog.tags.length > 0 && (
                  <div className="blog-tags">
                    <FiTag />
                    {currentBlog.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Blog Description */}
              <div className="blog-description">
                <div
                  className="description-content markdown-content"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdownToHtml(currentBlog.description),
                  }}
                />
              </div>

              {/* File Attachment */}
              {currentBlog.urlFile && (
                <div className="blog-attachment">
                  <div className="attachment-header">
                    <FiFile /> File đính kèm
                  </div>
                  <div className="attachment-content">
                    {isImageFile(currentBlog.urlFile) ? (
                      <div className="image-attachment">
                        <img src={currentBlog.urlFile} alt="Attachment" />
                        <a
                          href={currentBlog.urlFile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="download-link"
                        >
                          <FiDownload /> Tải về
                        </a>
                      </div>
                    ) : (
                      <div className="file-attachment">
                        <div className="file-info">
                          <FiFile />
                          <span>{getFileName(currentBlog.urlFile)}</span>
                        </div>
                        <a
                          href={currentBlog.urlFile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="download-link"
                        >
                          <FiDownload /> Tải về
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Reactions */}
              <div className="blog-reactions">
                <div className="reaction-buttons">
                  {reactionTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => handleReaction(type)}
                      disabled={reactionsLoading}
                      className={`reaction-btn ${
                        myReaction === type ? "active" : ""
                      }`}
                      title={getReactionDisplayName(type)}
                    >
                      {getReactionEmoji(type)}
                      <span className="reaction-count">
                        {blogReactionStats[type] || 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <div className="comments-section">
                <div className="comments-header">
                  <h3>
                    <FiMessageCircle /> Bình luận ({totalComments})
                  </h3>
                </div>

                {/* Add Comment Form */}
                {profileUser && (
                  <form
                    onSubmit={commentFormik.handleSubmit}
                    className="comment-form"
                  >
                    <div className="comment-input-group">
                      <textarea
                        name="content"
                        placeholder="Viết bình luận..."
                        value={commentFormik.values.content}
                        onChange={commentFormik.handleChange}
                        onBlur={commentFormik.handleBlur}
                        className={
                          commentFormik.touched.content &&
                          commentFormik.errors.content
                            ? "error"
                            : ""
                        }
                        rows="3"
                      />
                      <button
                        type="submit"
                        disabled={
                          !commentFormik.values.content.trim() ||
                          commentsLoading
                        }
                        className="send-btn"
                      >
                        <FiSend />
                      </button>
                    </div>
                    {commentFormik.touched.content &&
                      commentFormik.errors.content && (
                        <div className="error-message">
                          {commentFormik.errors.content}
                        </div>
                      )}
                  </form>
                )}

                {/* Comments List */}
                <div className="comments-list">
                  {commentsLoading ? (
                    <div className="loading">Đang tải bình luận...</div>
                  ) : comments.length === 0 ? (
                    <div className="empty">Chưa có bình luận nào</div>
                  ) : (
                    comments.map((comment) => (
                      <div
                        key={comment.id || comment.tempId}
                        className={`comment-item ${
                          comment.isOptimistic ? "optimistic-comment" : ""
                        } ${comment.isDeleting ? "deleting-comment" : ""}`}
                      >
                        {editingComment?.id === comment.id ? (
                          <form
                            onSubmit={editCommentFormik.handleSubmit}
                            className="edit-comment-form"
                          >
                            <textarea
                              name="content"
                              value={editCommentFormik.values.content}
                              onChange={editCommentFormik.handleChange}
                              className="edit-input"
                              rows="3"
                            />
                            <div className="edit-actions">
                              <button type="submit" className="save-btn">
                                Lưu
                              </button>
                              <button
                                type="button"
                                onClick={handleCancelEditComment}
                                className="cancel-btn"
                              >
                                Hủy
                              </button>
                            </div>
                          </form>
                        ) : (
                          <>
                            <div className="comment-header">
                              <div className="comment-author">
                                <strong>{comment.username}</strong>
                                <span className="comment-date">
                                  {getRelativeTime(comment.createdAt)}
                                </span>
                              </div>

                              {(canEditComment(comment) ||
                                canDeleteComment(comment)) && (
                                <div className="comment-actions">
                                  <button
                                    className="more-btn"
                                    onClick={() =>
                                      toggleCommentMenu(comment.id)
                                    }
                                  >
                                    <FiMoreHorizontal />
                                  </button>
                                  <div
                                    className={`action-menu ${
                                      openMenuCommentId === comment.id
                                        ? "show"
                                        : ""
                                    }`}
                                  >
                                    {canEditComment(comment) && (
                                      <button
                                        onClick={() =>
                                          handleEditComment(comment)
                                        }
                                        className="menu-item"
                                      >
                                        <FiEdit /> Chỉnh sửa
                                      </button>
                                    )}
                                    {canDeleteComment(comment) && (
                                      <button
                                        onClick={() =>
                                          handleDeleteCommentClick(comment)
                                        }
                                        className="menu-item delete"
                                      >
                                        <FiTrash2 /> Xóa
                                      </button>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="comment-content">
                              {comment.content}
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BoxConfirmDelete
        display={showDeleteBlog}
        handleCancel={() => setShowDeleteBlog(false)}
        handleDeleteBoxConfirm={handleDeleteBlog}
      />

      <BoxConfirmDelete
        display={showDeleteComment}
        handleCancel={() => setShowDeleteComment(false)}
        handleDeleteBoxConfirm={handleConfirmDeleteComment}
      />

      {showNotification && (
        <BoxNotification
          message={notificationText}
          status={notificationStatus}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
};

export default BlogDetails;
