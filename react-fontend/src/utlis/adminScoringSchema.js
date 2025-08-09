import * as Yup from "yup";

const adminScoringSchema = () => {
  return Yup.object({
    score: Yup.string().required("Không được để trống"),
    resultSummary: Yup.string().required("Không được để trống"),
  });
};

export default adminScoringSchema;
