import React, { useEffect } from "react";
import { useBlogCache } from "../hooks/useBlogCache";

const withBlogCache = (WrappedComponent) => {
  const ComponentWithCache = (props) => {
    const { loadCache } = useBlogCache();

    useEffect(() => {
      // Load cache when component mounts
      loadCache();
    }, [loadCache]);

    return <WrappedComponent {...props} />;
  };

  ComponentWithCache.displayName = `withBlogCache(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return ComponentWithCache;
};

export default withBlogCache;
