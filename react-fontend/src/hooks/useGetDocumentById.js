import { UserGetDocumentById } from "../api/UserCallApi";

const useGetDocumentById = () => {
  const getdocumnetbyid = async (documentId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await UserGetDocumentById(documentId, token);
      return res;
    } catch (error) {
      return error.message;
    }
  };
  return getdocumnetbyid;
};

export default useGetDocumentById;
