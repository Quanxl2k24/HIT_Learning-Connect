import { UserGetAllClass } from "../api/UserCallApi";

const UserGetAllClassByRegister = () => {
  const getallclass = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await UserGetAllClass(token);
      console.log("ress>>", res);

      return res.data.data;
    } catch (error) {
      return error.message;
    }
  };
  return getallclass;
};
export default UserGetAllClassByRegister;
