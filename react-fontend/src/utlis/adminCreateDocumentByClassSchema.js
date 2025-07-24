import * as Yup from "yup";

const adminCreateDocumentByClassSchema = Yup.object({
  title: Yup.string().required("Không được để trống"),
  description: Yup.string().required("Không được để trống"),
});

export default adminCreateDocumentByClassSchema;
