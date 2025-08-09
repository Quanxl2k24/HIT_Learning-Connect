import { AdminGetAllTotal } from "../api/UserCallApi";

const useGetTotal = () => {
  const gettotal = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await AdminGetAllTotal(token);
      return res.data.data;
    } catch (error) {
      return error.message;
    }
  };
  return gettotal;
};
export default useGetTotal;
