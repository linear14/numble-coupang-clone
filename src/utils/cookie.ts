import cookies from "js-cookie";

export const setAuthToken = ({
  accessToken,
  refreshToken,
}: {
  accessToken?: string;
  refreshToken?: string;
}) => {
  if (accessToken) {
    cookies.set("accessToken", accessToken, { expires: 1 });
  }
  if (refreshToken) {
    cookies.set("refreshToken", refreshToken, { expires: 7 });
  }
};

export const clearAuthToken = () => {
  cookies.remove("accessToken");
  cookies.remove("refreshToken");
};
