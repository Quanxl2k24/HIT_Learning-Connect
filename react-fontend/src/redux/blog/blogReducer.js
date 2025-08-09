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

const initialState = {
  // Blog List
  blogList: [],
  totalElements: 0,
  totalPages: 0,
  currentPage: 0,

  // Current blog
  currentBlog: null,

  // Comments
  comments: [],
  totalComments: 0,

  // Reactions
  reactionStats: {},
  myReactions: {},

  // Loading states
  loading: false,
  blogDetailLoading: false,
  commentsLoading: false,
  reactionsLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  // Success states
  success: false,

  // Error states
  error: null,
  commentError: null,
  reactionError: null,

  // Search
  searchQuery: "",
  searchResults: [],
  isSearching: false,
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    // =============== BLOG ACTIONS ===============
    case BLOG_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    case BLOG_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        blogList: action.payload?.content || action.payload || [],
        totalElements: action.payload?.totalElements || 0,
        totalPages: action.payload?.totalPages || 0,
        currentPage: action.payload?.number || 0,
        success: true,
        error: null,
      };

    case BLOG_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case BLOG_CREATE_REQUEST:
      return {
        ...state,
        createLoading: true,
        error: null,
        success: false,
      };

    case BLOG_CREATE_SUCCESS:
      return {
        ...state,
        createLoading: false,
        blogList: [action.payload, ...state.blogList],
        success: true,
        error: null,
      };

    case BLOG_CREATE_FAIL:
      return {
        ...state,
        createLoading: false,
        error: action.payload,
        success: false,
      };

    case BLOG_UPDATE_REQUEST:
      return {
        ...state,
        updateLoading: true,
        error: null,
        success: false,
      };

    case BLOG_UPDATE_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        blogList: state.blogList.map((blog) =>
          blog.blogId === action.payload.blogId ? action.payload : blog
        ),
        currentBlog: action.payload,
        success: true,
        error: null,
      };

    case BLOG_UPDATE_FAIL:
      return {
        ...state,
        updateLoading: false,
        error: action.payload,
        success: false,
      };

    case BLOG_DELETE_REQUEST:
      return {
        ...state,
        deleteLoading: true,
        error: null,
        success: false,
      };

    case BLOG_DELETE_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        blogList: state.blogList.filter(
          (blog) => blog.blogId !== action.payload
        ),
        success: true,
        error: null,
      };

    case BLOG_DELETE_FAIL:
      return {
        ...state,
        deleteLoading: false,
        error: action.payload,
        success: false,
      };

    case BLOG_DETAIL_REQUEST:
      return {
        ...state,
        blogDetailLoading: true,
        error: null,
      };

    case BLOG_DETAIL_SUCCESS:
      return {
        ...state,
        blogDetailLoading: false,
        currentBlog: action.payload,
        error: null,
      };

    case BLOG_DETAIL_FAIL:
      return {
        ...state,
        blogDetailLoading: false,
        error: action.payload,
      };

    case BLOG_SEARCH_REQUEST:
      return {
        ...state,
        isSearching: true,
        error: null,
      };

    case BLOG_SEARCH_SUCCESS:
      return {
        ...state,
        isSearching: false,
        searchResults: action.payload?.content || action.payload || [],
        error: null,
      };

    case BLOG_SEARCH_FAIL:
      return {
        ...state,
        isSearching: false,
        error: action.payload,
      };

    // =============== COMMENT ACTIONS ===============
    case COMMENT_LIST_REQUEST:
      return {
        ...state,
        commentsLoading: true,
        commentError: null,
      };

    case COMMENT_LIST_SUCCESS: {
      console.log("COMMENT_LIST_SUCCESS payload:", action.payload);
      const newState = {
        ...state,
        commentsLoading: false,
        comments: action.payload?.content || action.payload || [],
        totalComments:
          action.payload?.totalElements || action.payload?.length || 0,
        commentError: null,
      };
      console.log("New comments state:", newState.comments);
      console.log("New totalComments state:", newState.totalComments);
      return newState;
    }

    case COMMENT_LIST_FAIL:
      return {
        ...state,
        commentsLoading: false,
        commentError: action.payload,
      };

    case COMMENT_CREATE_REQUEST:
      return {
        ...state,
        commentsLoading: true,
        commentError: null,
      };

    case COMMENT_CREATE_OPTIMISTIC:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
        totalComments: state.totalComments + 1,
        commentsLoading: false,
      };

    case COMMENT_CREATE_SUCCESS:
      // Replace optimistic comment with real one
      return {
        ...state,
        commentsLoading: false,
        comments: state.comments.map((comment) =>
          comment.tempId === action.payload.tempId
            ? { ...action.payload, tempId: undefined }
            : comment
        ),
        commentError: null,
      };

    case COMMENT_CREATE_ROLLBACK:
      return {
        ...state,
        commentsLoading: false,
        comments: state.comments.filter(
          (comment) => comment.tempId !== action.payload
        ),
        totalComments: Math.max(0, state.totalComments - 1),
        commentError: action.error,
      };

    case COMMENT_CREATE_FAIL:
      return {
        ...state,
        commentsLoading: false,
        commentError: action.payload,
      };

    case COMMENT_UPDATE_REQUEST:
      return {
        ...state,
        commentsLoading: true,
        commentError: null,
      };

    case COMMENT_UPDATE_SUCCESS:
      return {
        ...state,
        commentsLoading: false,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.id ? action.payload : comment
        ),
        commentError: null,
      };

    case COMMENT_UPDATE_FAIL:
      return {
        ...state,
        commentsLoading: false,
        commentError: action.payload,
      };

    case COMMENT_DELETE_REQUEST:
      return {
        ...state,
        commentsLoading: true,
        commentError: null,
      };

    case COMMENT_DELETE_OPTIMISTIC:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === action.payload
            ? { ...comment, isDeleting: true }
            : comment
        ),
        commentsLoading: false,
      };

    case COMMENT_DELETE_SUCCESS:
      return {
        ...state,
        commentsLoading: false,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload
        ),
        totalComments: Math.max(0, state.totalComments - 1),
        commentError: null,
      };

    case COMMENT_DELETE_ROLLBACK:
      return {
        ...state,
        commentsLoading: false,
        comments: state.comments.map((comment) =>
          comment.id === action.payload
            ? { ...comment, isDeleting: false }
            : comment
        ),
        commentError: action.error,
      };

    case COMMENT_DELETE_FAIL:
      return {
        ...state,
        commentsLoading: false,
        commentError: action.payload,
      };

    // =============== REACTION ACTIONS ===============
    case REACTION_DROP_REQUEST:
      return {
        ...state,
        reactionsLoading: true,
        reactionError: null,
      };

    case REACTION_DROP_SUCCESS:
      return {
        ...state,
        reactionsLoading: false,
        reactionError: null,
      };

    case REACTION_DROP_FAIL:
      return {
        ...state,
        reactionsLoading: false,
        reactionError: action.payload,
      };

    case REACTION_STATS_REQUEST:
      return {
        ...state,
        reactionsLoading: true,
        reactionError: null,
      };

    case REACTION_STATS_SUCCESS:
      return {
        ...state,
        reactionsLoading: false,
        reactionStats: {
          ...state.reactionStats,
          [action.payload.blogId]: action.payload.stats,
        },
        reactionError: null,
      };

    case REACTION_STATS_FAIL:
      return {
        ...state,
        reactionsLoading: false,
        reactionError: action.payload,
      };

    case REACTION_MY_REQUEST:
      return {
        ...state,
        reactionsLoading: true,
        reactionError: null,
      };

    case REACTION_MY_SUCCESS:
      return {
        ...state,
        reactionsLoading: false,
        myReactions: {
          ...state.myReactions,
          [action.payload.blogId]: action.payload.reaction,
        },
        reactionError: null,
      };

    case REACTION_MY_FAIL:
      return {
        ...state,
        reactionsLoading: false,
        reactionError: action.payload,
      };

    // =============== UI ACTIONS ===============
    case SET_CURRENT_BLOG:
      return {
        ...state,
        currentBlog: action.payload,
      };

    case CLEAR_CURRENT_BLOG:
      return {
        ...state,
        currentBlog: null,
      };

    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        commentError: null,
        reactionError: null,
      };

    default:
      return state;
  }
};

export default blogReducer;
