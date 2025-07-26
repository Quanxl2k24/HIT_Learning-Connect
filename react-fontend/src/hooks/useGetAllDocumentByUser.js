import { UserGetAllDocument } from "../api/UserCallApi";

const useGetAllDocumentByUser = () => {
  const getdocumnet = async (classId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await UserGetAllDocument(classId, token);
      return res;
    } catch (error) {
      return error.message;
    }
  };
  return getdocumnet;
};

export default useGetAllDocumentByUser;
