import axios from "axios";

import Service from "./service";

class UserService extends Service {
  async me() {
    return await super.checkAccessToken(async () => {
      // 이렇게 쓰니깐 인증 정보가 필요한건지 아닌건지 모르겠긴 함..
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
