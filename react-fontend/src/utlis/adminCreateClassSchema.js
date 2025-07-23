import * as Yup from "yup";

const admimCreateClassSchema = Yup.object({
  title: Yup.string().required("Không được để trống"),
  description: Yup.string().required("Không được để trống"),
  teacherId: Yup.string().required("Không được để trống"),
  startDate: Yup.string().required("Không được để trống"),
  endDate: Yup.string().required("Không được để trống"),
});

export default admimCreateClassSchema;
