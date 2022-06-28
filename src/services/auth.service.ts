import axios from "axios";
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
    return await super.withRefreshToken(async () => {
      const { data } = await axios.post("/auth/refresh");

      if (data) {
        setAuthToken({ accessToken: data.access, refreshToken: data.refresh });
        return { success: true };
      } else {
        return { success: false };
      }
    });
  }

  async signup(user: User) {
    const { data } = await axios.post("/auth/signup", { ...user });

    if (data) {
      setAuthToken({ accessToken: data.access, refreshToken: data.refresh });
      return { success: true };
    } else {
      return { success: false };
    }
  }

  async login({ email, password }: LoginData) {
    const { data } = await axios.post("/auth/login", { email, password });

    if (data) {
      setAuthToken({ accessToken: data.access, refreshToken: data.refresh });
      return { success: true };
    } else {
      return { success: false };
    }
  }
}

export default new AuthService();
