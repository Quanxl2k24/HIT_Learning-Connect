import { ProfileUser } from "../api/UserCallApi";

const useGetProfile = () => {
  const handleGetProfile = async (token) => {
    try {
      const response = await ProfileUser(token.token);
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log("Loi sever tra ve: ", error.message);
    }
  };

  return handleGetProfile;
};

export default useGetProfile;
