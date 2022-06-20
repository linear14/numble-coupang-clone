import axios from "axios";
import cookies from "js-cookie";
import { setAuthToken } from "../utils/cookie";

import Service from "./service";

interface User {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  agreements: SignupAgreements;
}

type SignupAgreements = {
  privacy: boolean;
  ad:
    | {
        email: boolean;
        sms: boolean;
        app: boolean;
      }
    | false;
};

type LoginData = Pick<User, "email" | "password">;

class AuthService extends Service {
  async refresh() {
    const refreshToken = cookies.get("refreshToken");
    if (!refreshToken) {
      return;
    }

    const { data } = await axios.post("/auth/refresh", null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    setAuthToken({ accessToken: data.access, refreshToken: data.refresh });
  }

  async signup({ email, password, name, phoneNumber, agreements }: User) {
    const { data } = await axios.post("/auth/signup", {
      email,
      password,
      name,
      phoneNumber,
      agreements,
    });

    setAuthToken({ accessToken: data.access, refreshToken: data.refresh });
  }

  async login({ email, password }: LoginData) {
    const { data } = await axios.post("/auth/login", { email, password });

    setAuthToken({ accessToken: data.access, refreshToken: data.refresh });
  }
}

export default new AuthService();
