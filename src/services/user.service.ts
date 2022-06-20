import axios from "axios";

import Service from "./service";

class UserService extends Service {
  async me() {
    return await super.withAccessToken(async () => {
      const { data } = await axios.get("/users/me");
      return data;
    });
  }

  async read(id: number) {
    const { data } = await axios.get(`/users/${id}`);
    return data;
  }
}

export default new UserService();
