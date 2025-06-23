import * as Yup from "yup";
const ChangePasswordSchema = Yup.object({
  newpassword: Yup.string()
    .required("Không được để trống")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Mật khẩu cần có chữ cái viết hoa, kí tự đặc biệt và chữ số"
    ),
  confirmpassword: Yup.string()
    .required("Không được để trống")
    .oneOf([Yup.ref("newpassword")], "Mật khẩu xác nhận không khớp"),
});

export default ChangePasswordSchema;
