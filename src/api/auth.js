import { apiCall } from "../shared/utils";

export const register = async ({ email, password }) => {
  const response = await apiCall.post("/register", {
    email,
    password,
  });
  return response;
};
