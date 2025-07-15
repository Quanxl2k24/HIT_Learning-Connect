import Api from "./authApi";

const LoginApi = async (logindata) => {
  return await Api.post("/api/v1/auth/login", logindata);
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

export {
  LoginApi,
  ProfileUser,
  ChangePasswordApi,
  UpdateUserByUserApi,
  CreateUserByAdminApi,
  GetAllUserApi,
};
