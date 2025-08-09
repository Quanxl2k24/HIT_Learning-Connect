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
  deleteBlog,
  clearErrors,
  loadCachedData,
} from "../../redux/blog/blogActions";
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
  } = useSelector((state) => state.blog);

  const profileUser = useSelector((state) => state.user.profile);
  const isAdmin = profileUser?.roleName !== "ROLE_USER";

  // Local state
  const [searchQuery, setSearchQuery] = useState("");
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
    // Handle search
    if (debouncedSearchQuery.trim()) {
      const params = {
        page: 0,
        size: 50,
        sort: "blogId,desc",
      };
      dispatch(searchBlogsByTag(debouncedSearchQuery.trim(), params));
    }
  }, [debouncedSearchQuery, dispatch]);

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

  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog);
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    if (blogToDelete) {
      const result = await dispatch(deleteBlog(blogToDelete.blogId));
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
          {isAdmin && (
            <>
              <button
                onClick={() => handleEditBlog(blog.blogId)}
                className="action-btn edit-btn"
                title="Chỉnh sửa"
              >
                <FiEdit />
              </button>
              <button
                onClick={() => handleDeleteClick(blog)}
                className="action-btn delete-btn"
                title="Xóa"
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
                <div className="search-input-wrapper">
                  <FiSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo tag..."
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
                    Tìm kiếm: "{searchQuery}" • {currentList.length} kết quả
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
                    <p>Không tìm thấy bài viết nào với tag "{searchQuery}"</p>
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
