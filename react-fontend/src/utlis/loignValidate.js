import * as Yup from "yup";

const loginValidate = () => {
  return Yup.object({
    username: Yup.string()
      .required("Username không được để trống")
      .min(5, "Username phải có ít nhất 5 kí tự"),
    password: Yup.string()
      .required("Password không được để trống")
      .min(8, "Password phải đủ 8 kí tự"),
  });
};

export default loginValidate;
