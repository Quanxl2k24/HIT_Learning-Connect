import Api from "./authApi";

const LoginApi = async (logindata) => {
  return await Api.post("/api/v1/auth/login", logindata);
};

const ForgotPassword = async (email) => {
  return await Api.post("/api/v1/auth/send-code", email, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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

export {
  LoginApi,
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
};
