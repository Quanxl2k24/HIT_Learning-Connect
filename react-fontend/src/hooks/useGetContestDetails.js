import { AdminGetContestDetails } from "../api/UserCallApi";
const useGetContestDetails = () => {
  const getcontestdetails = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await AdminGetContestDetails(id, token);
      return res.data;
    } catch (error) {
      return error.message;
    }
  };
  return getcontestdetails;
};
export default useGetContestDetails;
