import {
  BlogCreateApi,
  BlogUpdateApi,
  BlogDeleteApi,
  BlogGetByIdApi,
  BlogGetAllApi,
  BlogSearchByTagApi,
  CommentCreateApi,
  CommentGetAllByBlogIdApi,
  CommentUpdateApi,
  CommentDeleteApi,
  ReactionDropApi,
  ReactionGetStatsApi,
  ReactionGetMyReactionApi,
} from "../../api/UserCallApi";

import {
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_LIST_FAIL,
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_SUCCESS,
  BLOG_CREATE_FAIL,
  BLOG_UPDATE_REQUEST,
  BLOG_UPDATE_SUCCESS,
  BLOG_UPDATE_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_SUCCESS,
  BLOG_DELETE_FAIL,
  BLOG_DETAIL_REQUEST,
  BLOG_DETAIL_SUCCESS,
  BLOG_DETAIL_FAIL,
  BLOG_SEARCH_REQUEST,
  BLOG_SEARCH_SUCCESS,
  BLOG_SEARCH_FAIL,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  COMMENT_LIST_FAIL,
  COMMENT_CREATE_REQUEST,
  COMMENT_CREATE_SUCCESS,
  COMMENT_CREATE_FAIL,
  COMMENT_CREATE_OPTIMISTIC,
  COMMENT_CREATE_ROLLBACK,
  COMMENT_UPDATE_REQUEST,
  COMMENT_UPDATE_SUCCESS,
  COMMENT_UPDATE_FAIL,
  COMMENT_UPDATE_OPTIMISTIC,
  COMMENT_UPDATE_ROLLBACK,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_FAIL,
  COMMENT_DELETE_OPTIMISTIC,
  COMMENT_DELETE_ROLLBACK,
  REACTION_DROP_REQUEST,
  REACTION_DROP_SUCCESS,
  REACTION_DROP_FAIL,
  REACTION_STATS_REQUEST,
  REACTION_STATS_SUCCESS,
  REACTION_STATS_FAIL,
  REACTION_MY_REQUEST,
  REACTION_MY_SUCCESS,
  REACTION_MY_FAIL,
  SET_CURRENT_BLOG,
  CLEAR_CURRENT_BLOG,
  SET_SEARCH_QUERY,
  CLEAR_ERRORS,
} from "./blogTypes";

// ================== CACHE ACTIONS ==================

export const loadCachedData = () => {
  return (dispatch) => {
    try {
      // Load cached blogs
      const cachedBlogs = JSON.parse(
        localStorage.getItem("cachedBlogs") || "{}"
      );
      const now = Date.now();

      // Find most recent valid cached blog
      let mostRecentBlog = null;
      let mostRecentTime = 0;

      Object.entries(cachedBlogs).forEach(([, cached]) => {
        if (
          now - cached.timestamp < cached.ttl &&
          cached.timestamp > mostRecentTime
        ) {
          mostRecentBlog = cached.data;
          mostRecentTime = cached.timestamp;
        }
      });

      if (mostRecentBlog) {
        dispatch({
          type: BLOG_DETAIL_SUCCESS,
          payload: mostRecentBlog,
        });
      }

      // Load cached blog list (try to find most recent page)
      const cacheKeys = Object.keys(localStorage).filter((key) =>
        key.startsWith("blogs_")
      );
      let mostRecentList = null;
      let mostRecentListTime = 0;

      cacheKeys.forEach((key) => {
        try {
          const cached = JSON.parse(localStorage.getItem(key) || "null");
          if (
            cached &&
            now - cached.timestamp < 5 * 60 * 1000 &&
            cached.timestamp > mostRecentListTime
          ) {
            mostRecentList = cached.data;
            mostRecentListTime = cached.timestamp;
          }
        } catch {
          // Silent fail for parsing
        }
      });

      if (mostRecentList) {
        dispatch({
          type: BLOG_LIST_SUCCESS,
          payload: mostRecentList,
        });
      }
    } catch {
      // Silent fail for cache loading
    }
  };
};

export const clearBlogCache = () => {
  return (dispatch) => {
    try {
      // Clear blog-related localStorage cache
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("blogs_") || key === "cachedBlogs") {
          localStorage.removeItem(key);
        }
      });

      dispatch({
        type: CLEAR_CURRENT_BLOG,
      });
    } catch (e) {
      console.warn("Failed to clear blog cache:", e);
    }
  };
};

// ================== BLOG ACTIONS ==================

export const fetchAllBlogs = (
  params = { page: 0, size: 10, sort: "blogId,desc" },
  forceRefresh = false
) => {
  return async (dispatch, getState) => {
    const { blog } = getState();
    const cacheKey = `blogs_${params.page}_${params.size}_${params.sort}`;

    // Check if we already have this data and it's not a forced refresh
    if (
      !forceRefresh &&
      blog.blogList.length > 0 &&
      blog.currentPage === params.page
    ) {
      // Check localStorage cache for this specific page
      try {
        const cachedData = JSON.parse(localStorage.getItem(cacheKey) || "null");
        if (cachedData && Date.now() - cachedData.timestamp < 2 * 60 * 1000) {
          // 2 minutes TTL
          return { success: true, data: blog.blogList, fromCache: true };
        }
      } catch (e) {
        console.warn("Failed to check cached blog list:", e);
      }
    }

    dispatch({ type: BLOG_LIST_REQUEST });
    try {
      const token = localStorage.getItem("token");
      const response = await BlogGetAllApi(params, token);
      const blogData = response.data.data;

      // Cache the blog list data
      try {
        const cacheData = {
          data: blogData,
          timestamp: Date.now(),
        };
        localStorage.setItem(cacheKey, JSON.stringify(cacheData));
      } catch {
        // Silent fail for cache
      }

      dispatch({
        type: BLOG_LIST_SUCCESS,
        payload: blogData,
      });
      return { success: true, data: blogData };
    } catch (error) {
      // Try to use cached data as fallback
      try {
        const cachedData = JSON.parse(localStorage.getItem(cacheKey) || "null");
        if (cachedData) {
          dispatch({
            type: BLOG_LIST_SUCCESS,
            payload: cachedData.data,
          });
          return { success: true, data: cachedData.data, fromCache: true };
        }
      } catch (e) {
        console.warn("Failed to use cached blog list:", e);
      }

      dispatch({
        type: BLOG_LIST_FAIL,
        payload: error.response?.data?.message || error.message,
      });
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  };
};

export const createBlog = (blogData) => {
  return async (dispatch) => {
    dispatch({ type: BLOG_CREATE_REQUEST });
    try {
      const token = localStorage.getItem("token");
      const response = await BlogCreateApi(blogData, token);
      dispatch({
        type: BLOG_CREATE_SUCCESS,
        payload: response.data.data,
      });
      return { success: true, data: response.data.data };
    } catch (error) {
      dispatch({
        type: BLOG_CREATE_FAIL,
        payload: error.response?.data?.message || error.message,
      });
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  };
};

export const updateBlog = (blogId, blogData) => {
  return async (dispatch) => {
    dispatch({ type: BLOG_UPDATE_REQUEST });
    try {
      console.log("Updating blog with ID:", blogId);
      console.log("Update data:", blogData);

      const token = localStorage.getItem("token");
      const response = await BlogUpdateApi(blogId, blogData, token);

      console.log("Update response:", response);

      const updatedBlog = response.data.data || response.data;

      // Update cached data
      try {
        const cachedBlogs = JSON.parse(
          localStorage.getItem("cachedBlogs") || "{}"
        );
        if (cachedBlogs[blogId]) {
          cachedBlogs[blogId] = {
            data: updatedBlog,
            timestamp: Date.now(),
            ttl: 5 * 60 * 1000, // 5 minutes TTL
          };
          localStorage.setItem("cachedBlogs", JSON.stringify(cachedBlogs));
        }
      } catch (e) {
        console.warn("Failed to update cached blog data:", e);
      }

      dispatch({
        type: BLOG_UPDATE_SUCCESS,
        payload: updatedBlog,
      });
      return { success: true, data: updatedBlog };
    } catch (error) {
      console.error("Update blog error:", error);
      console.error("Error response:", error.response?.data);

      dispatch({
        type: BLOG_UPDATE_FAIL,
        payload: error.response?.data?.message || error.message,
      });
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  };
};

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    dispatch({ type: BLOG_DELETE_REQUEST });
    try {
      const token = localStorage.getItem("token");
      await BlogDeleteApi(blogId, token);
      dispatch({
        type: BLOG_DELETE_SUCCESS,
        payload: blogId,
      });
      return { success: true };
    } catch (error) {
      dispatch({
        type: BLOG_DELETE_FAIL,
        payload: error.response?.data?.message || error.message,
      });
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  };
};

export const fetchBlogById = (blogId, forceRefresh = false) => {
  return async (dispatch, getState) => {
    const { blog } = getState();

    // Check if we already have this blog and it's not a forced refresh
    if (
      !forceRefresh &&
      blog.currentBlog &&
      blog.currentBlog.blogId == blogId
    ) {
      // Already have the blog, no need to fetch again
      return { success: true, data: blog.currentBlog, fromCache: true };
    }

    dispatch({ type: BLOG_DETAIL_REQUEST });
    try {
      const token = localStorage.getItem("token");
      const response = await BlogGetByIdApi(blogId, token);

      // Cache the blog data in localStorage for persistence
      const blogData = response.data.data;
      try {
        const cachedBlogs = JSON.parse(
          localStorage.getItem("cachedBlogs") || "{}"
        );
        cachedBlogs[blogId] = {
          data: blogData,
          timestamp: Date.now(),
          ttl: 5 * 60 * 1000, // 5 minutes TTL
        };
        localStorage.setItem("cachedBlogs", JSON.stringify(cachedBlogs));
      } catch (e) {
        console.warn("Failed to cache blog data:", e);
      }

      dispatch({
        type: BLOG_DETAIL_SUCCESS,
        payload: blogData,
      });
      return { success: true, data: blogData };
    } catch (error) {
      // Try to use cached data as fallback
      try {
        const cachedBlogs = JSON.parse(
          localStorage.getItem("cachedBlogs") || "{}"
        );
        const cachedBlog = cachedBlogs[blogId];
        if (cachedBlog && Date.now() - cachedBlog.timestamp < cachedBlog.ttl) {
          dispatch({
            type: BLOG_DETAIL_SUCCESS,
            payload: cachedBlog.data,
          });
          return { success: true, data: cachedBlog.data, fromCache: true };
        }
      } catch (e) {
        console.warn("Failed to use cached blog data:", e);
      }

      dispatch({
        type: BLOG_DETAIL_FAIL,
        payload: error.response?.data?.message || error.message,
      });
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  };
};

export const searchBlogsByTag = (
  tag,
  params = { page: 0, size: 10, sort: "blogId,desc" }
) => {
  return async (dispatch) => {
    dispatch({ type: BLOG_SEARCH_REQUEST });
    try {
      const token = localStorage.getItem("token");
      const response = await BlogSearchByTagApi(tag, params, token);
      dispatch({
        type: BLOG_SEARCH_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: BLOG_SEARCH_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};

// ================== COMMENT ACTIONS ==================

export const fetchCommentsByBlogId = (
  blogId,
  params = { page: 0, size: 50, sort: "commentId,desc" }
) => {
  return async (dispatch) => {
    dispatch({ type: COMMENT_LIST_REQUEST });
    try {
      const token = localStorage.getItem("token");

      // Check if token exists
      if (!token) {
        dispatch({
          type: COMMENT_LIST_FAIL,
          payload: "Authentication token not found",
        });
        return { success: false, error: "Authentication token not found" };
      }

      console.log(
        "Fetching comments for blogId:",
        blogId,
        "with params:",
        params
      );
      const response = await CommentGetAllByBlogIdApi(blogId, params, token);
      console.log("Full API Response:", response);
      console.log("Response data:", response.data);

      // Handle different response structures
      let comments = [];
      let totalComments = 0;

      if (response && response.data) {
        console.log("Processing response.data:", response.data);

        if (response.data.data) {
          console.log("Found nested data structure:", response.data.data);
          // Standard response with data wrapper
          if (Array.isArray(response.data.data.content)) {
            comments = response.data.data.content;
            totalComments = response.data.data.totalElements || comments.length;
            console.log("Using content array:", comments);
          } else if (Array.isArray(response.data.data)) {
            comments = response.data.data;
            totalComments = comments.length;
            console.log("Using direct data array:", comments);
          }
        } else if (Array.isArray(response.data.content)) {
          // Direct content in response.data
          comments = response.data.content;
          totalComments = response.data.totalElements || comments.length;
          console.log("Using response.data.content:", comments);
        } else if (Array.isArray(response.data)) {
          // Direct array response
          comments = response.data;
          totalComments = comments.length;
          console.log("Using direct response.data array:", comments);
        }
      }

      console.log("Final processed comments:", comments);
      console.log("Total comments:", totalComments);

      const payload = {
        content: comments,
        totalElements: totalComments,
      };

      console.log("Dispatching COMMENT_LIST_SUCCESS with payload:", payload);

      dispatch({
        type: COMMENT_LIST_SUCCESS,
        payload: payload,
      });

      return { success: true, data: payload };
    } catch (error) {
      console.error("Failed to fetch comments:", error);
      console.error("Error details:", error.response?.data);

      // Graceful fallback - still show UI but with empty comments
      dispatch({
        type: COMMENT_LIST_SUCCESS,
        payload: {
          content: [],
          totalElements: 0,
        },
      });

      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to load comments",
        fallback: true,
      };
    }
  };
};

export const createComment = (commentData) => {
  return async (dispatch, getState) => {
    const { user } = getState();
    const tempId = `temp_${Date.now()}_${Math.random()}`;

    // Optimistic update - add comment immediately to UI
    const optimisticComment = {
      id: tempId,
      tempId: tempId,
      content: commentData.content,
      username: user.profile?.username || "You",
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    dispatch({
      type: COMMENT_CREATE_OPTIMISTIC,
      payload: optimisticComment,
    });

    dispatch({ type: COMMENT_CREATE_REQUEST });
    try {
      const token = localStorage.getItem("token");
      const response = await CommentCreateApi(commentData, token);

      dispatch({
        type: COMMENT_CREATE_SUCCESS,
        payload: {
          ...(response.data || response),
          tempId: tempId,
        },
      });
      return { success: true, data: response.data || response };
    } catch (error) {
      // Rollback optimistic update on error
      dispatch({
        type: COMMENT_CREATE_ROLLBACK,
        payload: tempId,
        error: error.response?.data?.message || error.message,
      });

      dispatch({
        type: COMMENT_CREATE_FAIL,
        payload: error.response?.data?.message || error.message,
      });
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  };
};

export const updateComment = (commentId, content) => {
  return async (dispatch) => {
    dispatch({ type: COMMENT_UPDATE_REQUEST });
    try {
      const token = localStorage.getItem("token");
      const response = await CommentUpdateApi(commentId, content, token);
      dispatch({
        type: COMMENT_UPDATE_SUCCESS,
        payload: response.data.data || response.data,
      });
      return { success: true, data: response.data.data || response.data };
    } catch (error) {
      dispatch({
        type: COMMENT_UPDATE_FAIL,
        payload: error.response?.data?.message || error.message,
      });
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  };
};

export const deleteComment = (commentId) => {
  return async (dispatch) => {
    dispatch({ type: COMMENT_DELETE_REQUEST });
    try {
      const token = localStorage.getItem("token");
      await CommentDeleteApi(commentId, token);
      dispatch({
        type: COMMENT_DELETE_SUCCESS,
        payload: commentId,
      });
      return { success: true };
    } catch (error) {
      dispatch({
        type: COMMENT_DELETE_FAIL,
        payload: error.response?.data?.message || error.message,
      });
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  };
};

// ================== REACTION ACTIONS ==================

export const dropReaction = (reactionData) => {
  return async (dispatch) => {
    dispatch({ type: REACTION_DROP_REQUEST });
    try {
      const token = localStorage.getItem("token");
      await ReactionDropApi(reactionData, token);
      dispatch({
        type: REACTION_DROP_SUCCESS,
        payload: reactionData,
      });
      return { success: true };
    } catch (error) {
      dispatch({
        type: REACTION_DROP_FAIL,
        payload: error.response?.data?.message || error.message,
      });
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  };
};

export const fetchReactionStats = (blogId) => {
  return async (dispatch) => {
    dispatch({ type: REACTION_STATS_REQUEST });
    try {
      const token = localStorage.getItem("token");
      const response = await ReactionGetStatsApi(blogId, token);
      dispatch({
        type: REACTION_STATS_SUCCESS,
        payload: { blogId, stats: response.data.data || response.data },
      });
      return { success: true, data: response.data.data || response.data };
    } catch (error) {
      dispatch({
        type: REACTION_STATS_FAIL,
        payload: error.response?.data?.message || error.message,
      });
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  };
};

export const fetchMyReaction = (blogId) => {
  return async (dispatch) => {
    dispatch({ type: REACTION_MY_REQUEST });
    try {
      const token = localStorage.getItem("token");
      const response = await ReactionGetMyReactionApi(blogId, token);
      dispatch({
        type: REACTION_MY_SUCCESS,
        payload: { blogId, reaction: response.data.data || response.data },
      });
      return { success: true, data: response.data.data || response.data };
    } catch (error) {
      dispatch({
        type: REACTION_MY_FAIL,
        payload: error.response?.data?.message || error.message,
      });
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  };
};

// ================== UI ACTIONS ==================

export const setCurrentBlog = (blog) => ({
  type: SET_CURRENT_BLOG,
  payload: blog,
});

export const clearCurrentBlog = () => ({
  type: CLEAR_CURRENT_BLOG,
});

export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});
