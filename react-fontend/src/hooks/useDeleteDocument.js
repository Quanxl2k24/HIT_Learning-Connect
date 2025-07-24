import { AdminDeleteDocumentApi } from "../api/UserCallApi";
const useDeleteDocument = () => {
  const deletedocument = async (documentId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await AdminDeleteDocumentApi(documentId, token);
      return res;
    } catch (error) {
      return false;
    }
  };
  return deletedocument;
};

export default useDeleteDocument;
