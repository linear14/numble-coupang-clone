import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useQuery } from "react-query";

import { UserService } from "../src/services";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { data: me } = useQuery("me", UserService.me, {
    refetchInterval: 500,
  });

  console.log("내 정보입니다", me);

  return (
    <div className={styles.container}>
      <Head>
        <title>NUMBLE:: 쿠팡 클론</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>홈페이지</main>
    </div>
  );
};

export default Home;
