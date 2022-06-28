import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import { AuthService } from "../src/services";
import Layout from "../components/_layout";
import cookies from "next-cookies";

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
        <Layout hasSession={pageProps.hasSession}>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  let pageProps = {};
  const { accessToken, refreshToken } = cookies(ctx);

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  if (!accessToken) {
    if (refreshToken) {
      const { success } = await AuthService.refresh();
      pageProps = { ...pageProps, hasSession: success };
    }
  } else {
    pageProps = { ...pageProps, hasSession: true };
  }

  return { pageProps };
};

export default MyApp;
