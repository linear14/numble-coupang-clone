import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import cookies from "js-cookie";
import { AuthService } from "../src/services";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_HOST;
// axios.interceptors.response.use(
//   function (response) {
//     // 200 성공
//     return response;
//   },
//   function (error) {
//     // 200 이외의 실패
//     if (error.status === 401) {
//       const originalRequest = error.config;
//       AuthService.refresh();

//       // 요렇게 하면 interceptors.request 안으로 다시 들어가겠지?
//       return axios(originalRequest);
//     }

//     return Promise.reject(error);
//   }
// );

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
