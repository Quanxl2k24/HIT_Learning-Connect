import * as Yup from "yup";

const adminUpdateDocumentSchema = Yup.object({
  title: Yup.string().required("Không để trống"),
  fileUrl: Yup.string().required("Không để trống"),
  description: Yup.string().required("Không để trống"),
});

export default adminUpdateDocumentSchema;
