import * as Yup from "yup";

const adminUpdateUserSchema = Yup.object({
  username: Yup.string()
    .required("Username không được để trống")
    .min(5, "Username phải có ít nhất 5 kí tụ"),

  fullname: Yup.string().required("Họ và tên không được để trống"),
  email: Yup.string()
    .required("Email trống rồi kìa bro")
    .matches(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Chưa đúng dạng email nha bro"
    ),
  role: Yup.string().required("Role không được để trống"),
  birthday: Yup.string().required("Ngày sinh không được để trống"),
  gender: Yup.string().required("Giới tính không được để trống"),
});

export default adminUpdateUserSchema;
