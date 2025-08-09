import * as Yup from "yup";

export const blogUpdateSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .min(5, "Title must be at least 5 characters long")
    .max(200, "Title must be less than 200 characters")
    .required("Title is required"),

  description: Yup.string()
    .trim()
    .min(10, "Description must be at least 10 characters long")
    .max(5000, "Description must be less than 5000 characters")
    .required("Description is required"),

  tags: Yup.string()
    .trim()
    .max(500, "Tags must be less than 500 characters")
    .test("tags-format", "Invalid tag format", function (value) {
      if (!value) return true; // tags are optional

      const tags = value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      // Check if any tag is too long
      const invalidTags = tags.filter((tag) => tag.length > 50);
      if (invalidTags.length > 0) {
        return this.createError({
          message: "Each tag must be less than 50 characters",
        });
      }

      // Check if there are too many tags
      if (tags.length > 10) {
        return this.createError({
          message: "Maximum 10 tags allowed",
        });
      }

      // Check for valid tag characters (letters, numbers, spaces, hyphens, underscores)
      const validTagRegex = /^[a-zA-Z0-9\s\-_]+$/;
      const invalidCharTags = tags.filter((tag) => !validTagRegex.test(tag));
      if (invalidCharTags.length > 0) {
        return this.createError({
          message:
            "Tags can only contain letters, numbers, spaces, hyphens, and underscores",
        });
      }

      return true;
    }),
});
