// Markdown utilities for handling image paste and rendering

/**
 * Handle paste event in textarea to upload images from clipboard
 * @param {ClipboardEvent} event - The paste event
 * @param {Function} uploadFile - Function to upload file to server
 * @param {Function} onImageUploaded - Callback when image is uploaded successfully
 * @returns {Promise<void>}
 */
export const handleImagePaste = async (event, uploadFile, onImageUploaded) => {
  const clipboardData = event.clipboardData || window.clipboardData;
  const items = clipboardData.items;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    // Check if the item is an image
    if (item.type.indexOf("image") !== -1) {
      event.preventDefault(); // Prevent default paste behavior

      const file = item.getAsFile();
      if (file) {
        try {
          console.log("Starting image upload...");
          // Upload the image
          const uploadResult = await uploadFile(file);
          console.log("Upload result:", uploadResult);

          if (uploadResult.success && uploadResult.fileUrl) {
            // Generate markdown image syntax
            const imageMarkdown = `![Image](${uploadResult.fileUrl})`;
            console.log("Generated markdown:", imageMarkdown);

            // Call the callback with the markdown
            onImageUploaded(imageMarkdown, event.target);
          } else {
            console.error("Failed to upload image:", uploadResult.error);
            // Show error to user
            throw new Error(uploadResult.error || "Upload failed");
          }
        } catch (error) {
          console.error("Error uploading pasted image:", error);
          throw error;
        }
      }
      break;
    }
  }
};

/**
 * Insert text at cursor position in textarea
 * @param {HTMLTextAreaElement} textarea - The textarea element
 * @param {string} textToInsert - Text to insert
 */
export const insertTextAtCursor = (textarea, textToInsert) => {
  const startPos = textarea.selectionStart;
  const endPos = textarea.selectionEnd;
  const textBefore = textarea.value.substring(0, startPos);
  const textAfter = textarea.value.substring(endPos);

  const newValue = textBefore + textToInsert + textAfter;

  // Update the textarea value
  textarea.value = newValue;

  // Set cursor position after inserted text
  const newCursorPos = startPos + textToInsert.length;
  textarea.setSelectionRange(newCursorPos, newCursorPos);

  // Trigger input event to update formik
  const inputEvent = new Event("input", { bubbles: true });
  textarea.dispatchEvent(inputEvent);
};

/**
 * Convert markdown content to HTML for display
 * @param {string} markdownContent - The markdown content
 * @returns {string} HTML content
 */
export const renderMarkdownToHtml = (markdownContent) => {
  if (!markdownContent) return "";

  let htmlContent = markdownContent;

  // Convert markdown to HTML first, then escape remaining < and >

  // Images ![alt](url) - Process first to avoid conflicts
  htmlContent = htmlContent.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border: 1px solid #e5e5e5;" loading="lazy" />'
  );

  // Links [text](url)
  htmlContent = htmlContent.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #007bff; text-decoration: none;">$1</a>'
  );

  // Headers (# ## ### etc.)
  htmlContent = htmlContent.replace(
    /^###### (.*$)/gim,
    '<h6 style="margin: 16px 0 8px 0; font-weight: 600; color: #666;">$1</h6>'
  );
  htmlContent = htmlContent.replace(
    /^##### (.*$)/gim,
    '<h5 style="margin: 18px 0 10px 0; font-weight: 600; color: #555;">$1</h5>'
  );
  htmlContent = htmlContent.replace(
    /^#### (.*$)/gim,
    '<h4 style="margin: 20px 0 12px 0; font-weight: 600; color: #444;">$1</h4>'
  );
  htmlContent = htmlContent.replace(
    /^### (.*$)/gim,
    '<h3 style="margin: 24px 0 16px 0; font-weight: 600; color: #333;">$1</h3>'
  );
  htmlContent = htmlContent.replace(
    /^## (.*$)/gim,
    '<h2 style="margin: 32px 0 20px 0; font-weight: 600; color: #222;">$1</h2>'
  );
  htmlContent = htmlContent.replace(
    /^# (.*$)/gim,
    '<h1 style="margin: 40px 0 24px 0; font-weight: 600; color: #111;">$1</h1>'
  );

  // Bold **text** or __text__
  htmlContent = htmlContent.replace(
    /\*\*(.*?)\*\*/g,
    '<strong style="font-weight: 600; color: #222;">$1</strong>'
  );
  htmlContent = htmlContent.replace(
    /__(.*?)__/g,
    '<strong style="font-weight: 600; color: #222;">$1</strong>'
  );

  // Italic *text* or _text_
  htmlContent = htmlContent.replace(
    /\*(.*?)\*/g,
    '<em style="font-style: italic; color: #555;">$1</em>'
  );
  htmlContent = htmlContent.replace(
    /_(.*?)_/g,
    '<em style="font-style: italic; color: #555;">$1</em>'
  );

  // Strikethrough ~~text~~
  htmlContent = htmlContent.replace(
    /~~(.*?)~~/g,
    '<del style="text-decoration: line-through; color: #888;">$1</del>'
  );

  // Code blocks ```code``` (before inline code)
  htmlContent = htmlContent.replace(
    /```([\s\S]*?)```/g,
    '<pre style="background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 6px; padding: 16px; overflow-x: auto; margin: 16px 0; font-family: Monaco, Menlo, monospace; font-size: 14px;"><code>$1</code></pre>'
  );

  // Inline code `code`
  htmlContent = htmlContent.replace(
    /`([^`]+)`/g,
    '<code style="background-color: #f1f3f4; color: #d73a49; padding: 2px 4px; border-radius: 3px; font-family: Monaco, Menlo, monospace; font-size: 0.9em;">$1</code>'
  );

  // Blockquotes > text
  htmlContent = htmlContent.replace(
    /^>\s?(.*$)/gim,
    '<blockquote style="border-left: 4px solid #007bff; margin: 16px 0; padding: 0 16px; color: #666; font-style: italic; background-color: #f8f9fa;">$1</blockquote>'
  );

  // Horizontal rules --- or ***
  htmlContent = htmlContent.replace(
    /^---$/gm,
    '<hr style="border: none; height: 2px; background-color: #e9ecef; margin: 24px 0;">'
  );
  htmlContent = htmlContent.replace(
    /^\*\*\*$/gm,
    '<hr style="border: none; height: 2px; background-color: #e9ecef; margin: 24px 0;">'
  );

  // Lists - Process line by line to handle nested lists properly
  const lines = htmlContent.split("\n");
  let inUnorderedList = false;
  let inOrderedList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Unordered list items
    if (/^[-*+]\s+/.test(line)) {
      if (!inUnorderedList) {
        lines[i] =
          '<ul style="margin: 16px 0; padding-left: 24px;"><li>' +
          line.replace(/^[-*+]\s+/, "") +
          "</li>";
        inUnorderedList = true;
      } else {
        lines[i] = "<li>" + line.replace(/^[-*+]\s+/, "") + "</li>";
      }
    }
    // Ordered list items
    else if (/^\d+\.\s+/.test(line)) {
      if (!inOrderedList) {
        lines[i] =
          '<ol style="margin: 16px 0; padding-left: 24px;"><li>' +
          line.replace(/^\d+\.\s+/, "") +
          "</li>";
        inOrderedList = true;
      } else {
        lines[i] = "<li>" + line.replace(/^\d+\.\s+/, "") + "</li>";
      }
    }
    // Close lists when encountering non-list content
    else if (line !== "" && (inUnorderedList || inOrderedList)) {
      if (inUnorderedList) {
        lines[i - 1] = lines[i - 1] + "</ul>";
        inUnorderedList = false;
      }
      if (inOrderedList) {
        lines[i - 1] = lines[i - 1] + "</ol>";
        inOrderedList = false;
      }
    }
  }

  // Close any remaining open lists
  if (inUnorderedList) {
    lines[lines.length - 1] = lines[lines.length - 1] + "</ul>";
  }
  if (inOrderedList) {
    lines[lines.length - 1] = lines[lines.length - 1] + "</ol>";
  }

  htmlContent = lines.join("\n");

  // Convert line breaks to paragraphs and br tags
  // Split by double newlines to create paragraphs
  const paragraphs = htmlContent.split("\n\n");
  htmlContent = paragraphs
    .map((p) => {
      p = p.trim();
      if (!p) return "";

      // If paragraph doesn't already contain HTML tags, wrap in <p>
      if (!p.includes("<") || (!p.startsWith("<") && !p.includes("</"))) {
        return "<p>" + p.replace(/\n/g, "<br>") + "</p>";
      }

      // If it contains HTML, just convert single newlines to br
      return p.replace(/\n/g, "<br>");
    })
    .filter((p) => p)
    .join("\n\n");

  // Clean up extra spacing
  htmlContent = htmlContent.replace(/\n\s*\n/g, "\n");
  htmlContent = htmlContent.replace(/^\s+|\s+$/g, "");

  return htmlContent;
};

/**
 * Check if content contains markdown images
 * @param {string} content - The content to check
 * @returns {boolean} True if contains markdown images
 */
export const hasMarkdownImages = (content) => {
  if (!content) return false;
  return /!\[([^\]]*)\]\(([^)]+)\)/g.test(content);
};

/**
 * Extract all image URLs from markdown content
 * @param {string} content - The markdown content
 * @returns {Array<string>} Array of image URLs
 */
export const extractImageUrls = (content) => {
  if (!content) return [];

  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const urls = [];
  let match;

  while ((match = imageRegex.exec(content)) !== null) {
    urls.push(match[2]); // The URL is in the second capture group
  }

  return urls;
};
