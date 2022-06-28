import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { UserService } from "../src/services";

interface Props {
  children: React.ReactNode;
  hasSession?: boolean;
}

const Layout = ({ children, hasSession }: Props) => {
  const { data: me } = useQuery("me", UserService.me, {
    refetchInterval: 500,
    enabled: hasSession,
  });

  console.log(me);

  return (
    <>
      <header className="header">
        <div>
          <Link href={"/"}>넘블 챌린지</Link>
        </div>
        <div>
          {hasSession ? (
            <>
              <div>
                <span>{me?.name}</span>님
              </div>
              <div>로그아웃</div>
            </>
          ) : (
            <>
              <Link href={"/auth"}>로그인</Link>
              <Link href={"/auth/new"}>회원가입</Link>
            </>
          )}
        </div>
      </header>
      {children}
      <footer></footer>
    </>
  );
};

export default Layout;
