import axios from "axios";

// 여기에 명시된 메서드는 되도록이면 인스턴스 메서드로 사용할 수 없으면 좋겠고,
// 단순 확장 클래스 내부에서만 접근할 수 있는 메서드면 좋겠다.
class Service {
  constructor() {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_HOST;
  }
}

export default Service;
