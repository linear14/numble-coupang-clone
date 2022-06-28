import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AuthService, UserService } from "../src/services";

interface Props {
  children: React.ReactNode;
  hasSession?: boolean;
}

const Layout = ({ children, hasSession }: Props) => {
  const router = useRouter();

  // 실제로도 이렇게 내 정보를 계속 refetch 하는 방식으로 데이터를 관리하는지..?
  const { data: me } = useQuery("me", UserService.me, {
    refetchInterval: 500,
  });

  const handleLogout = useCallback(async () => {
    const { success } = await AuthService.logout();
    if (success) {
      window.location.href = router.asPath;
    } else {
      alert("로그아웃 실패");
    }
  }, [router]);

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
              <div onClick={handleLogout}>로그아웃</div>
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
