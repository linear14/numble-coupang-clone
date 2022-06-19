import axios from "axios";
import cookies from "js-cookie";

import Service from "./service";

class UserService extends Service {
  async me() {
    const accessToken = cookies.get("accessToken");
    if (!accessToken) {
      return;
    }

    const { data } = await axios.get("/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  }

  async read(id: number) {
    const { data } = await axios.get(`/users/${id}`);

    return data;
  }
}

export default new UserService();
