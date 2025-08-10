import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiPlus,
  FiEye,
  FiEdit,
  FiTrash2,
  FiCalendar,
  FiUser,
  FiTag,
} from "react-icons/fi";
import SideBar from "../../components/SideBar/SideBar";
import BoxNotification from "../../components/BoxNotificaton/BoxNotifiacation";
import BoxConfirmDelete from "../../components/BoxConfrimDelete/BoxConfirmDelete";
import {
  fetchAllBlogs,
  searchBlogsByTag,
  searchBlogsByKeyword,
  deleteBlog,
  clearErrors,
  loadCachedData,
  fetchMultipleReactionStats,
} from "../../redux/blog/blogActions";
import { fetchUser } from "../../redux/user/userActions";
import { getRelativeTime, truncateText } from "../../utlis/blogUtils";
import useDebounce from "../../hooks/useDebounce";
import "./BlogList.scss";

const BlogList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const {
    blogList,
    totalPages,
    loading,
    deleteLoading,
    error,
    success,
    searchResults,
    isSearching,
    reactionStats,
  } = useSelector((state) => state.blog);

  const profileUser = useSelector((state) => state.user.profile);
  // Fix admin check - if profile is not loaded yet, assume not admin
  const isAdmin =
    profileUser && profileUser.roleName && profileUser.roleName !== "ROLE_USER";

  // Debug logging
  console.log("BlogList - profileUser:", profileUser);
  console.log("BlogList - roleName:", profileUser?.roleName);
  console.log("BlogList - isAdmin:", isAdmin);
  console.log("BlogList - deleteLoading:", deleteLoading);

  // Local state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("tag"); // "tag" or "keyword"
  const [currentPageState, setCurrentPageState] = useState(0);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [notificationStatus, setNotificationStatus] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Debounce search
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Get current list (search results or regular blog list)
  const currentList = searchQuery ? searchResults : blogList;
  // Only show loading when we have no data at all AND we're actually loading
  const showLoading = (loading || isSearching) && currentList.length === 0;
  const isLoading = loading || isSearching;

  useEffect(() => {
    // Load user profile if not already loaded
    if (!profileUser) {
      dispatch(fetchUser());
    }
  }, [dispatch, profileUser]);

  useEffect(() => {
    // Load cached data first for immediate UI
    if (isInitialLoad) {
      dispatch(loadCachedData());
      setIsInitialLoad(false);
    }

    // Then load fresh data (with smart caching) only if we don't have data for this page
    const params = {
      page: currentPageState,
      size: 12,
      sort: "blogId,desc",
    };

    // Only fetch if we don't have data for current page or if it's been a while
    const shouldFetch =
      blogList.length === 0 ||
      Date.now() -
        (parseInt(
          localStorage.getItem(
            `blogs_${params.page}_${params.size}_${params.sort}_timestamp`
          )
        ) || 0) >
        60000; // 1 minute

    if (shouldFetch) {
      dispatch(fetchAllBlogs(params, false)); // false = don't force refresh, use cache if available
    }
  }, [dispatch, currentPageState, isInitialLoad, blogList.length]);

  useEffect(() => {
    // Load reaction stats when blogs are loaded
    if (currentList && currentList.length > 0) {
      const blogIds = currentList.map((blog) => blog.blogId);
      console.log("Loading reaction stats for blogs:", blogIds);
      dispatch(fetchMultipleReactionStats(blogIds));
    }
  }, [currentList, dispatch]);

  useEffect(() => {
    // Handle search
    if (debouncedSearchQuery.trim()) {
      const params = {
        page: 0,
        size: 50,
        sort: "blogId,desc",
      };

      if (searchType === "keyword") {
        console.log("Performing keyword search:", debouncedSearchQuery.trim());
        dispatch(searchBlogsByKeyword(debouncedSearchQuery.trim(), params));
      } else {
        console.log("Performing tag search:", debouncedSearchQuery.trim());
        dispatch(searchBlogsByTag(debouncedSearchQuery.trim(), params));
      }
    }
  }, [debouncedSearchQuery, searchType, dispatch]);

  useEffect(() => {
    // Only show success for delete operations
    if (success && !loading && !deleteLoading && showConfirmDelete) {
      setNotificationText("Xóa bài viết thành công!");
      setNotificationStatus("success");
      setShowNotification(true);
      dispatch(clearErrors());
      setShowConfirmDelete(false);
      setBlogToDelete(null);
    }
  }, [success, loading, deleteLoading, showConfirmDelete, dispatch]);

  useEffect(() => {
    // Handle error notifications
    if (error && !loading) {
      setNotificationText(error);
      setNotificationStatus("error");
      setShowNotification(true);
      dispatch(clearErrors());
    }
  }, [error, loading, dispatch]);

  useEffect(() => {
    // Clear notifications that shouldn't show
    if (showNotification && notificationText === "Đăng nhập thành công") {
      setShowNotification(false);
      setNotificationText("");
    }
  }, [showNotification, notificationText]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages && !isLoading) {
      setCurrentPageState(newPage);
    }
  };

  const handleCreateBlog = () => {
    navigate("/Blog/Create");
  };

  const handleViewBlog = (blogId) => {
    navigate(`/Blog/${blogId}`);
  };

  const handleEditBlog = (blogId) => {
    navigate(`/Blog/${blogId}/Edit`);
  };

  const handleDirectDelete = async (blog) => {
    console.log("=== HANDLE DIRECT DELETE START ===");
    console.log("Deleting blog directly:", blog);
    console.log("Blog.blogId:", blog?.blogId);
    console.log("Blog.blogId type:", typeof blog?.blogId);

    // Validate blog and blogId
    if (
      !blog ||
      !blog.blogId ||
      blog.blogId === "undefined" ||
      blog.blogId === "null"
    ) {
      console.error("Invalid blog or blogId:", blog);
      setShowNotification(false);
      setTimeout(() => {
        setNotificationText("ID bài viết không hợp lệ!");
        setNotificationStatus("error");
        setShowNotification(true);
      }, 100);
      return;
    }

    try {
      const result = await dispatch(deleteBlog(blog.blogId));
      console.log("=== DELETE RESULT RECEIVED ===");
      console.log("Full result object:", result);
      console.log("result.success:", result?.success);
      console.log("result.error:", result?.error);

      // Clear any existing notifications first
      setShowNotification(false);
      setTimeout(() => {
        if (result && result.success) {
          console.log("Delete successful - showing success notification");
          setNotificationText("Xóa bài viết thành công!");
          setNotificationStatus("success");
          setShowNotification(true);
          // Refresh current page
          const params = {
            page: currentPageState,
            size: 12,
            sort: "blogId,desc", // Ensure sort has valid default value
          };
          console.log("Refresh params after delete:", params);
          if (searchQuery.trim()) {
            dispatch(searchBlogsByTag(searchQuery.trim(), params));
          } else {
            dispatch(fetchAllBlogs(params));
          }
        } else {
          console.error("=== DELETE FAILED ===");
          console.error("Full result:", result);
          const errorMessage = result?.error || "Xóa bài viết thất bại!";
          console.error("Error message to show:", errorMessage);
          setNotificationText(errorMessage);
          setNotificationStatus("error");
          setShowNotification(true);
        }
      }, 100); // Small delay to ensure state clears
    } catch (error) {
      console.error("=== DELETE CATCH ERROR ===");
      console.error("Caught error:", error);
      setShowNotification(false);
      setTimeout(() => {
        setNotificationText("Có lỗi xảy ra khi xóa bài viết!");
        setNotificationStatus("error");
        setShowNotification(true);
      }, 100);
    }
  };

  const handleConfirmDelete = async () => {
    if (blogToDelete) {
      console.log("Deleting blog:", blogToDelete);
      try {
        const result = await dispatch(deleteBlog(blogToDelete.blogId));
        console.log("Delete result:", result);

        if (result.success) {
          setNotificationText("Xóa bài viết thành công!");
          setNotificationStatus("success");
          setShowNotification(true);
          // Refresh current page
          const params = {
            page: currentPageState,
            size: 12,
            sort: "blogId,desc",
          };
          dispatch(fetchAllBlogs(params));
        } else {
          console.error("Delete failed:", result.error);
          setNotificationText(result.error || "Xóa bài viết thất bại!");
          setNotificationStatus("error");
          setShowNotification(true);
        }
      } catch (error) {
        console.error("Delete error:", error);
        setNotificationText("Có lỗi xảy ra khi xóa bài viết!");
        setNotificationStatus("error");
        setShowNotification(true);
      }
    }
    setShowConfirmDelete(false);
    setBlogToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
    setBlogToDelete(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
    setNotificationText("");
    setNotificationStatus(null);
  };

  const renderPagination = () => {
    if (!totalPages || totalPages <= 1 || searchQuery) return null;

    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(0, currentPageState - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(0, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPageState - 1)}
          disabled={currentPageState === 0 || isLoading}
          className="page-btn"
        >
          ‹
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={isLoading}
            className={`page-btn ${page === currentPageState ? "active" : ""}`}
          >
            {page + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPageState + 1)}
          disabled={currentPageState >= totalPages - 1 || isLoading}
          className="page-btn"
        >
          ›
        </button>
      </div>
    );
  };

  // Check if current user can edit/delete this blog
  const canEditBlog = (blog) => {
    console.log("=== canEditBlog DEBUG ===");
    console.log("profileUser:", profileUser);
    console.log("blog:", blog);

    if (!profileUser) {
      console.log("canEditBlog: No profile user - returning false");
      return false;
    }

    // Log the exact values
    console.log("EXACT VALUES:");
    console.log("blog.author:", JSON.stringify(blog.author));
    console.log("profileUser.username:", JSON.stringify(profileUser.username));
    console.log("profileUser.fullName:", JSON.stringify(profileUser.fullName));
    console.log(
      "blog.author === profileUser.fullName:",
      blog.author === profileUser.fullName
    );
    console.log("isAdmin:", isAdmin);

    console.log("canEditBlog detailed check:", {
      blogTitle: blog.title,
      blogAuthor: blog.author,
      blogAuthorType: typeof blog.author,
      currentUser: profileUser.username,
      currentUserFullName: profileUser.fullName,
      isAdmin,
      authorMatchUsername: blog.author === profileUser.username,
      authorMatchFullName: blog.author === profileUser.fullName,
      finalResult: isAdmin || blog.author === profileUser.fullName,
    });

    // Admin can edit all blogs, or user can edit their own blogs (compare with fullName)
    const canEdit = isAdmin || blog.author === profileUser.fullName;
    console.log("canEditBlog final result:", canEdit);
    return canEdit;
  };

  // Function to render reaction stats
  const renderReactionStats = (blogId) => {
    const stats = reactionStats[blogId];
    if (!stats) return null;

    const totalReactions =
      (stats.like || 0) +
      (stats.love || 0) +
      (stats.haha || 0) +
      (stats.wow || 0) +
      (stats.sad || 0) +
      (stats.angry || 0);

    if (totalReactions === 0) return null;

    return (
      <div className="blog-reactions">
        {stats.like > 0 && (
          <span className="reaction-item">👍 {stats.like}</span>
        )}
        {stats.love > 0 && (
          <span className="reaction-item">❤️ {stats.love}</span>
        )}
        {stats.haha > 0 && (
          <span className="reaction-item">😄 {stats.haha}</span>
        )}
        {stats.wow > 0 && <span className="reaction-item">😲 {stats.wow}</span>}
        {stats.sad > 0 && <span className="reaction-item">😢 {stats.sad}</span>}
        {stats.angry > 0 && (
          <span className="reaction-item">😡 {stats.angry}</span>
        )}
        <span className="total-reactions">({totalReactions} reactions)</span>
      </div>
    );
  };

  const renderBlogCard = (blog) => (
    <div key={blog.blogId} className="blog-card">
      <div className="blog-card-header">
        <h3 className="blog-title" onClick={() => handleViewBlog(blog.blogId)}>
          {blog.title}
        </h3>
        <div className="blog-actions">
          <button
            onClick={() => handleViewBlog(blog.blogId)}
            className="action-btn view-btn"
            title="Xem chi tiết"
          >
            <FiEye />
          </button>
          {canEditBlog(blog) && (
            <>
              <button
                onClick={() => handleEditBlog(blog.blogId)}
                className="action-btn edit-btn"
                title="Chỉnh sửa"
              >
                <FiEdit />
              </button>
              <button
                onClick={(e) => {
                  console.log("=== DELETE BUTTON CLICKED ===");
                  console.log("Event:", e);
                  console.log("Blog:", blog);
                  e.preventDefault();
                  e.stopPropagation();

                  // Show confirmation dialog
                  const confirmDelete = window.confirm(
                    "Bạn có chắc chắn muốn xóa bài viết này không?"
                  );
                  if (!confirmDelete) {
                    console.log("User cancelled delete");
                    return;
                  }

                  // Proceed with delete
                  handleDirectDelete(blog);
                }}
                className="action-btn delete-btn"
                title="Xóa bài viết"
                disabled={deleteLoading}
              >
                <FiTrash2 />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="blog-meta">
        <span className="blog-author">
          <FiUser /> {blog.author}
        </span>
        <span className="blog-date">
          <FiCalendar /> {getRelativeTime(blog.createdAt)}
        </span>
      </div>

      <div className="blog-description">
        {truncateText(blog.description, 150)}
      </div>

      {blog.tags && blog.tags.length > 0 && (
        <div className="blog-tags">
          <FiTag />
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="tag"
              onClick={() => handleTagClick(tag)}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {blog.urlFile && (
        <div className="blog-file">
          <span className="file-indicator">📎 Có file đính kèm</span>
        </div>
      )}

      {renderReactionStats(blog.blogId)}
    </div>
  );

  return (
    <div className="blog-list-container">
      <div className="blog-list">
        <div className="blog-list-left">
          <SideBar />
        </div>

        <div className="blog-list-right">
          <div className="blog-list-header">
            <h1>Bài Viết</h1>

            <div className="header-actions">
              <div className="search-container">
                <div className="search-type-selector">
                  <label className="search-type-option">
                    <input
                      type="radio"
                      name="searchType"
                      value="tag"
                      checked={searchType === "tag"}
                      onChange={(e) => setSearchType(e.target.value)}
                    />
                    <span>Tìm theo tag</span>
                  </label>
                  <label className="search-type-option">
                    <input
                      type="radio"
                      name="searchType"
                      value="keyword"
                      checked={searchType === "keyword"}
                      onChange={(e) => setSearchType(e.target.value)}
                    />
                    <span>Tìm từ khóa</span>
                  </label>
                </div>
                <div className="search-input-wrapper">
                  <FiSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder={
                      searchType === "keyword"
                        ? "Tìm kiếm trong tiêu đề và nội dung..."
                        : "Tìm kiếm theo tag..."
                    }
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                  />
                  {searchQuery && (
                    <button onClick={clearSearch} className="clear-search">
                      ×
                    </button>
                  )}
                </div>
                {searchQuery && (
                  <div className="search-info">
                    Tìm kiếm {searchType === "keyword" ? "từ khóa" : "tag"}: "
                    {searchQuery}" • {currentList.length} kết quả
                  </div>
                )}
              </div>

              <button onClick={handleCreateBlog} className="create-btn">
                <FiPlus /> Tạo bài viết
              </button>
            </div>
          </div>

          <div className="blog-list-content">
            {isLoading ? (
              <div className="loading">Đang tải...</div>
            ) : currentList.length === 0 ? (
              <div className="empty">
                {searchQuery ? (
                  <>
                    <p>
                      Không tìm thấy bài viết nào với{" "}
                      {searchType === "keyword" ? "từ khóa" : "tag"} "
                      {searchQuery}"
                    </p>
                    <button onClick={clearSearch} className="clear-search-btn">
                      Xem tất cả bài viết
                    </button>
                  </>
                ) : (
                  <>
                    <p>Chưa có bài viết nào</p>
                    <button onClick={handleCreateBlog} className="create-btn">
                      Tạo bài viết đầu tiên
                    </button>
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="blog-grid">
                  {currentList.map(renderBlogCard)}
                </div>
                {renderPagination()}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showConfirmDelete && (
        <BoxConfirmDelete
          message={`Bạn có chắc chắn muốn xóa bài viết "${blogToDelete?.title}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          isLoading={deleteLoading}
        />
      )}

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

export default BlogList;