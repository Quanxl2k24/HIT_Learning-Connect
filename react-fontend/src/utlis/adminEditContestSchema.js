import * as Yup from "yup";

const adminEditContestSchema = Yup.object({
  title: Yup.string().required("Không được để trống"),
  startTime: Yup.string().required("Không được để trống"),
  endTime: Yup.string().required("Không được để trống"),
  description: Yup.string().required("Không được để trống"),
  urlFile: Yup.string().required("Không được để trống"),
});

export default adminEditContestSchema;
