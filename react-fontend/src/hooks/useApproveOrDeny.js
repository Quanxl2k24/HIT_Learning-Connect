import { AdminApproveOrDenyRegisterApi } from "../api/UserCallApi";

const useApproveOrDeny = () => {
  const callApproveOrDeny = async (dataApproveOrDeny) => {
    const token = localStorage.getItem("token");
    try {
      const res = await AdminApproveOrDenyRegisterApi(dataApproveOrDeny, token);
      return res;
    } catch (error) {
      return error.message;
    }
  };
  return { callApproveOrDeny };
};
export default useApproveOrDeny;
