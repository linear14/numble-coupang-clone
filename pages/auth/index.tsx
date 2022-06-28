import { useRouter } from "next/router";
import { useCallback, useRef } from "react";
import { AuthService } from "../../src/services";
import styles from "../../styles/LoginPage.module.css";

const LoginPage = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitForm = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;

      if (email && password) {
        const loginData = {
          email,
          password,
        };

        const { success } = await AuthService.login(loginData);
        if (success) {
          alert("로그인 성공");
          router.replace("/");
        } else {
          alert("로그인 실패");
        }
      }
    },
    [router]
  );

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={submitForm}>
        <input placeholder="이메일" ref={emailRef} />
        <input placeholder="비밀번호" ref={passwordRef} />
        <button type="submit">로그인</button>
      </form>
    </main>
  );
};

export default LoginPage;
