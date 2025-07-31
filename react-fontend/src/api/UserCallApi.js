import { height } from "@fortawesome/free-solid-svg-icons/fa0";
import Api from "./authApi";

const LoginApi = async (logindata) => {
  return await Api.post("/api/v1/auth/login", logindata);
};

const ForgotPassword = async (email) => {
  return await Api.post("/api/v1/auth/send-code", { email });
};

const ProfileUser = async (token) => {
  return await Api.get("/api/v1/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const ChangePasswordApi = async (passwordNew) => {
  return await Api.post(
    "/api/v1/auth/change-password-first-time",
    passwordNew,
    {
      headers: {
        Authorization: `Bearer ${passwordNew.token} `,
      },
    }
  );
};

const UpdateUserByUserApi = async (dataUpdate, token) => {
  return await Api.put("/api/v1/users/profile/update", dataUpdate, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const CreateUserByAdminApi = async (dataCreate, token) => {
  return await Api.post("/api/v1/users", dataCreate, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
};

const GetAllUserApi = async (params, token) => {
  const queryParams = new URLSearchParams({
    page: params.page,
    size: params.size,
    sort: params.sort,
  });

  return await Api.get(`/api/v1/users?${queryParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const UpdateUserByAdminApi = async (userId, dataUpdate, token) => {
  return await Api.put(`/api/v1/users/${userId}`, dataUpdate, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
};

const DeleteUserByAdminApi = async (userId, token) => {
  return await Api.delete(`/api/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
};

const GetAllClassByUserAndAdmin = async (token) => {
  return await Api.get("/api/v1/classes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const DeleteClassByAdmin = async (classId, token) => {
  console.log("id class: ", classId);

  return await Api.delete(`/api/v1/classes/${classId}`, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
};

const CreateClassByAdminApi = async (dataCreate, token) => {
  return await Api.post("/api/v1/classes", dataCreate, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
};

const UpdateClassByAdminApi = async (classId, dataUpdate, token) => {
  return await Api.put(`/api/v1/classes/${classId}`, dataUpdate, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
};

const GetAllRegisterByAdminApi = async (params, token) => {
  const queryParams = new URLSearchParams({
    page: params.page,
    size: params.size,
    sort: params.sort,
  });
  return Api.get(`/api/v1/registration?${queryParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
};

const UserRegisterClassApi = async (classId, token) => {
  return await Api.post(
    "/api/v1/registration",
    { classId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

const AdminApproveOrDenyRegisterApi = async (dataApproveOrDeny, token) => {
  return await Api.post("/api/v1/registration/approve", dataApproveOrDeny, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const AdminDeleteRegisterApi = async (registrationId, token) => {
  return await Api.delete(`/api/v1/registration/${registrationId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const AdminSreachUserApi = async (params, token) => {
  const queryParams = new URLSearchParams({
    size: params.size,
    page: params.page,
    sort: params.sort,
    keyword: params.keyword,
  });
  return await Api.get(`/api/v1/users/filter?${queryParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
};

const AdminGetAllDocumnetByClass = async (classId, token) => {
  return await Api.get(`/api/v1/documents/class/${classId}`, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
};

const AdminPushFileByClass = async (file, token) => {
  const formData = new FormData();
  formData.append("file", file);
  return await Api.post("/api/v1/storage/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

const AdminDeleteFileByClass = async (url, token) => {
  console.log("api", { url });

  return Api.post(
    "/api/v1/storage/delete",
    { url },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const AdminPushFromDocument = async (dataPush, token) => {
  return Api.post("/api/v1/documents", dataPush, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const AdminDeleteDocumentApi = async (documentId, token) => {
  return await Api.delete(`/api/v1/documents/${documentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const AdminGetDocumentApi = async (documentId, token) => {
  return await Api.get(`/api/v1/documents/${documentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const AdminEditDocumentByClassApi = async (documentId, dataUpdate, token) => {
  return await Api.put(`/api/v1/documents/${documentId}`, dataUpdate, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const AdminSreachClassApi = async (keyword, token) => {
  const queryParams = new URLSearchParams({
    keyword: keyword,
  });

  return await Api.get(`/api/v1/classes/filter?${queryParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const AdminGetAllClassAccpet = async (token) => {
  return await Api.post(
    "/api/v1/registration/accept",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const UserGetAllDocument = async (classId, token) => {
  return await Api.get(`/api/v1/documents/class/${classId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const UserGetAllClass = async (token) => {
  return await Api.get("/api/v1/classes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const UserGetDocumentById = async (documentId, token) => {
  return await Api.get(`/api/v1/documents/${documentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const UserGetClassRegisterApi = async (token) => {
  return await Api.get("/api/v1/registration/view", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const UserCancelRegisterApi = async (classId, token) => {
  return await Api.delete(`/api/v1/registration/cancel/${classId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const AdminGetAllContestApi = async (token) => {
  return await Api.get("/api/contests/paged", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const AdminGetContestDetails = async (id, token) => {
  return await Api.get(`/api/contests/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const AdminCreateContestApi = async (dataCreate, token) => {
  console.log(">>>>", dataCreate);

  return await Api.post(`/api/contests`, dataCreate, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  LoginApi,
  ForgotPassword,
  ProfileUser,
  ChangePasswordApi,
  UpdateUserByUserApi,
  CreateUserByAdminApi,
  GetAllUserApi,
  UpdateUserByAdminApi,
  DeleteUserByAdminApi,
  GetAllClassByUserAndAdmin,
  DeleteClassByAdmin,
  CreateClassByAdminApi,
  UpdateClassByAdminApi,
  GetAllRegisterByAdminApi,
  UserRegisterClassApi,
  AdminApproveOrDenyRegisterApi,
  AdminDeleteRegisterApi,
  AdminSreachUserApi,
  AdminGetAllDocumnetByClass,
  AdminPushFileByClass,
  AdminDeleteFileByClass,
  AdminPushFromDocument,
  AdminDeleteDocumentApi,
  AdminGetDocumentApi,
  AdminEditDocumentByClassApi,
  AdminSreachClassApi,
  AdminGetAllClassAccpet,
  UserGetAllDocument,
  UserGetAllClass,
  UserGetDocumentById,
  UserGetClassRegisterApi,
  UserCancelRegisterApi,
  AdminGetAllContestApi,
  AdminGetContestDetails,
  AdminCreateContestApi,
};
