import { AdminGetDocumentApi } from "../api/UserCallApi";

const useGetDocumentBydocumentId = () => {
  const getdocumentbydocumentid = async (documentId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await AdminGetDocumentApi(documentId, token);
      return res;
    } catch (error) {
      return error.message;
    }
  };
  return getdocumentbydocumentid;
};

export default useGetDocumentBydocumentId;
