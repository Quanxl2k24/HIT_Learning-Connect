import * as yup from "yup";

const commentSchema = yup.object().shape({
  content: yup
    .string()
    .required("Nội dung bình luận là bắt buộc")
    .min(1, "Nội dung bình luận không được để trống")
    .max(1000, "Nội dung bình luận không được quá 1000 ký tự")
    .trim(),
});

export default commentSchema;
