import Cookies from "js-cookie";

// 여기에 명시된 메서드는 되도록이면 인스턴스 메서드로 사용할 수 없으면 좋겠고,
// 단순 확장 클래스 내부에서만 접근할 수 있는 메서드면 좋겠다.
class Service {
  constructor() {
    console.log("service created");
  }

  async checkAccessToken(cb: Function) {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      return await cb();
    } else {
      return;
    }
  }
}

export default Service;