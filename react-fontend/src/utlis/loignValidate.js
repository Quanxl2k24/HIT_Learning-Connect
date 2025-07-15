import * as Yup from "yup";

const loginValidate = () => {
  return Yup.object({
    username: Yup.string()
      .required("Username không được để trống")
      .min(5, "Username phải có ít nhất 5 kí tự"),
    password: Yup.string()
      .required("Password không được để trống")
      .min(4, "Password phải đủ 8 kí tự"), // test phai sua lai thanh 8 ki tu
  });
};

export default loginValidate;
