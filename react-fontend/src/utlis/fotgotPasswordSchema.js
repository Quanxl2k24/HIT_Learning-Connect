import * as Yup from "yup";

const fotgotPasswordSchema = Yup.object({
  email: Yup.string()
    .required("Email trống rồi kìa bro")
    .matches(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Chưa đúng dạng email nha bro"
    ),
});

export default fotgotPasswordSchema;
