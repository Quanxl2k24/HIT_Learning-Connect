import * as Yup from "yup";

const userSubmitContestSchema = () => {
  return Yup.object({
    urlFile: Yup.string().required("Không được để trống"),
  });
};

export default userSubmitContestSchema;
