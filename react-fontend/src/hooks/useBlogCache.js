import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { loadCachedData, clearBlogCache } from "../redux/blog/blogActions";

export const useBlogCache = () => {
  const dispatch = useDispatch();
  const { currentBlog, blogList } = useSelector((state) => state.blog);

  const loadCache = useCallback(() => {
    dispatch(loadCachedData());
  }, [dispatch]);

  const clearCache = useCallback(() => {
    dispatch(clearBlogCache());
  }, [dispatch]);

  const hasCachedBlog = useCallback(
    (blogId) => {
      if (currentBlog && currentBlog.blogId == blogId) {
        return true;
      }

      try {
        const cachedBlogs = JSON.parse(
          localStorage.getItem("cachedBlogs") || "{}"
        );
        const cached = cachedBlogs[blogId];
        if (cached && Date.now() - cached.timestamp < cached.ttl) {
          return true;
        }
      } catch (e) {
        console.warn("Failed to check cached blog:", e);
      }

      return false;
    },
    [currentBlog]
  );

  const hasCachedBlogList = useCallback(
    (params) => {
      if (blogList.length > 0) {
        return true;
      }

      try {
        const cacheKey = `blogs_${params.page}_${params.size}_${params.sort}`;
        const cachedData = JSON.parse(localStorage.getItem(cacheKey) || "null");
        if (cachedData && Date.now() - cachedData.timestamp < 2 * 60 * 1000) {
          return true;
        }
      } catch (e) {
        console.warn("Failed to check cached blog list:", e);
      }

      return false;
    },
    [blogList]
  );

  return {
    loadCache,
    clearCache,
    hasCachedBlog,
    hasCachedBlogList,
    currentBlog,
    blogList,
  };
};
