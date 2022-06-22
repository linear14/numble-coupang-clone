import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <header className="header">
        <Link href={"/"}>넘블 챌린지</Link>
        <div>
          <Link href={"/auth"}>로그인</Link>
          <Link href={"/auth/new"}>회원가입</Link>
        </div>
      </header>
      {children}
      <footer></footer>
    </>
  );
};

export default Layout;
