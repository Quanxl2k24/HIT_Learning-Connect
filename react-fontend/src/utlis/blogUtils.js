/**
 * Parse tags from string to array
 * Support both #tag and tag formats
 * @param {string} tagsString - String containing tags separated by spaces
 * @returns {string[]} Array of tag names without # prefix
 */
export const parseTagsFromString = (tagsString) => {
  if (!tagsString || typeof tagsString !== "string") return [];

  return tagsString
    .trim()
    .split(/\s+/)
    .filter((tag) => tag.length > 0)
    .map((tag) => (tag.startsWith("#") ? tag.substring(1) : tag))
    .filter((tag) => tag.length > 0);
};

/**
 * Format tags array to display string with # prefix
 * @param {string[]} tagsArray - Array of tag names
 * @returns {string} Formatted string with # prefix
 */
export const formatTagsForDisplay = (tagsArray) => {
  if (!Array.isArray(tagsArray) || tagsArray.length === 0) return "";

  return tagsArray.map((tag) => `#${tag}`).join(" ");
};

/**
 * Format tags array to string for API request (space-separated)
 * @param {string[]} tagsArray - Array of tag names
 * @returns {string} Space-separated string without # prefix
 */
export const formatTagsForApi = (tagsArray) => {
  if (!Array.isArray(tagsArray) || tagsArray.length === 0) return "";

  return tagsArray.join(" ");
};

/**
 * Format tags input for API request
 * @param {string} tagsInput - Tags input string (comma or space separated)
 * @returns {string} Space-separated string for API
 */
export const formatTagsForRequest = (tagsInput) => {
  if (!tagsInput || typeof tagsInput !== "string") return "";

  // Split by comma or space, clean and filter
  const tags = tagsInput
    .split(/[,\s]+/)
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)
    .map((tag) => (tag.startsWith("#") ? tag.substring(1) : tag))
    .filter((tag) => tag.length > 0);

  return tags.join(" ");
};

/**
 * Validate tag input
 * @param {string} tag - Single tag to validate
 * @returns {boolean} True if valid tag
 */
export const isValidTag = (tag) => {
  if (!tag || typeof tag !== "string") return false;

  const cleanTag = tag.startsWith("#") ? tag.substring(1) : tag;

  // Tag should be 1-50 characters, alphanumeric, underscore, hyphen
  return /^[a-zA-Z0-9_-]{1,50}$/.test(cleanTag);
};

/**
 * Parse multiple tags from input and validate
 * @param {string} input - User input string
 * @returns {object} { valid: string[], invalid: string[] }
 */
export const parseAndValidateTags = (input) => {
  const tags = parseTagsFromString(input);
  const valid = [];
  const invalid = [];

  tags.forEach((tag) => {
    if (isValidTag(tag)) {
      valid.push(tag);
    } else {
      invalid.push(tag);
    }
  });

  return { valid, invalid };
};

/**
 * Get file extension from URL
 * @param {string} url - File URL
 * @returns {string} File extension or empty string
 */
export const getFileExtension = (url) => {
  if (!url || typeof url !== "string") return "";

  const lastDot = url.lastIndexOf(".");
  const lastSlash = url.lastIndexOf("/");

  if (lastDot > lastSlash && lastDot !== -1) {
    return url.substring(lastDot + 1).toLowerCase();
  }

  return "";
};

/**
 * Get file name from URL
 * @param {string} url - File URL
 * @returns {string} File name or "File đính kèm" as fallback
 */
export const getFileName = (url) => {
  if (!url || typeof url !== "string") return "File đính kèm";

  try {
    // Extract filename from URL
    const urlParts = url.split("/");
    let fileName = urlParts[urlParts.length - 1];

    // Remove query parameters if any
    if (fileName.includes("?")) {
      fileName = fileName.split("?")[0];
    }

    // Remove hash if any
    if (fileName.includes("#")) {
      fileName = fileName.split("#")[0];
    }

    // Decode URL encoding
    fileName = decodeURIComponent(fileName);

    // If filename is empty or too long, show truncated version
    if (!fileName || fileName.length === 0) {
      return "File đính kèm";
    }

    // Truncate long filenames
    if (fileName.length > 50) {
      const ext = getFileExtension(fileName);
      const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf("."));
      const truncatedName = nameWithoutExt.substring(0, 40) + "...";
      return ext ? `${truncatedName}.${ext}` : truncatedName;
    }

    return fileName;
  } catch (error) {
    return "File đính kèm";
  }
};

/**
 * Check if file is image based on extension
 * @param {string} url - File URL
 * @returns {boolean} True if image file
 */
export const isImageFile = (url) => {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"];
  const extension = getFileExtension(url);
  return imageExtensions.includes(extension);
};

/**
 * Check if file is document based on extension
 * @param {string} url - File URL
 * @returns {boolean} True if document file
 */
export const isDocumentFile = (url) => {
  const docExtensions = [
    "pdf",
    "doc",
    "docx",
    "ppt",
    "pptx",
    "xls",
    "xlsx",
    "txt",
    "rtf",
  ];
  const extension = getFileExtension(url);
  return docExtensions.includes(extension);
};

/**
 * Format file size to readable string
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (!bytes || isNaN(bytes)) return "0 B";

  const sizes = ["B", "KB", "MB", "GB"];
  let i = 0;
  let size = bytes;

  while (size >= 1024 && i < sizes.length - 1) {
    size /= 1024;
    i++;
  }

  return `${size.toFixed(1)} ${sizes[i]}`;
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text with ellipsis
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || typeof text !== "string") return "";

  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength).trim() + "...";
};

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return "";

  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);
};

/**
 * Get relative time string (e.g., "2 hours ago")
 * @param {string|Date} date - Date to compare
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return "";

  const now = new Date();
  const diffInMs = now - dateObj;
  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSecs < 60) return "Vừa xong";
  if (diffInMins < 60) return `${diffInMins} phút trước`;
  if (diffInHours < 24) return `${diffInHours} giờ trước`;
  if (diffInDays < 7) return `${diffInDays} ngày trước`;

  return formatDate(dateObj);
};

/**
 * Debounce function for search
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

/**
 * Generate reaction emoji based on type
 * @param {string} reactionType - Reaction type from backend
 * @returns {string} Emoji representation
 */
export const getReactionEmoji = (reactionType) => {
  const emojiMap = {
    LIKE: "👍",
    LOVE: "❤️",
    HAHA: "😂",
    WOW: "😮",
    SAD: "😢",
    ANGRY: "😠",
  };

  return emojiMap[reactionType] || "👍";
};

/**
 * Get reaction display name
 * @param {string} reactionType - Reaction type from backend
 * @returns {string} Display name in Vietnamese
 */
export const getReactionDisplayName = (reactionType) => {
  const nameMap = {
    LIKE: "Thích",
    LOVE: "Yêu thích",
    HAHA: "Haha",
    WOW: "Wow",
    SAD: "Buồn",
    ANGRY: "Giận dữ",
  };

  return nameMap[reactionType] || "Thích";
};
