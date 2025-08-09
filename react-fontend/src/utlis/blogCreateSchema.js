import * as yup from "yup";

const blogCreateSchema = yup.object().shape({
  title: yup
    .string()
    .required("Tiêu đề là bắt buộc")
    .min(5, "Tiêu đề phải có ít nhất 5 ký tự")
    .max(200, "Tiêu đề không được quá 200 ký tự")
    .trim(),

  description: yup
    .string()
    .required("Nội dung là bắt buộc")
    .min(10, "Nội dung phải có ít nhất 10 ký tự")
    .max(5000, "Nội dung không được quá 5000 ký tự")
    .trim(),

  tags: yup
    .string()
    .required("Tags là bắt buộc")
    .test(
      "valid-tags",
      "Tags không hợp lệ. Chỉ chấp nhận chữ cái, số, dấu gạch ngang và gạch dưới",
      function (value) {
        if (!value) return false;

        const tags = value.trim().split(/\s+/);

        // Check if at least one tag
        if (tags.length === 0) return false;

        // Check each tag format
        for (let tag of tags) {
          const cleanTag = tag.startsWith("#") ? tag.substring(1) : tag;
          if (!cleanTag || !/^[a-zA-Z0-9_-]{1,50}$/.test(cleanTag)) {
            return false;
          }
        }

        return true;
      }
    )
    .test("max-tags", "Không được quá 10 tags", function (value) {
      if (!value) return true;
      const tags = value.trim().split(/\s+/);
      return tags.length <= 10;
    }),

  urlFile: yup.string().nullable().url("URL file không hợp lệ"),
});

export default blogCreateSchema;
