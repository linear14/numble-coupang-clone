import { GetServerSideProps } from "next";
import cookies from "next-cookies";
import { useRouter } from "next/router";
import React, { useCallback, useRef } from "react";
import { AuthService } from "../../src/services";
import styles from "../../styles/SignUpPage.module.css";

const SignUpPage = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const submitForm = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const email = emailRef.current?.value;
      // const password = passwordRef.current?.value;
      // const name = nameRef.current?.value;
      // const phoneNumber = phoneNumberRef.current?.value;

      if (email) {
        const agreements = {
          privacy: true,
          ad: {
            email: true,
            sms: true,
            app: true,
          },
        };

        const user = {
          email,
          password: "1234",
          name: "동현",
          phoneNumber: "01012345678",
          agreements,
        };

        const { success } = await AuthService.signup(user);
        if (success) {
          alert("회원가입 성공");
          router.replace("/");
        } else {
          alert("회원가입 실패");
        }
      }
    },
    [router]
  );

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={submitForm}>
        <input placeholder="이메일" ref={emailRef} />
        <input placeholder="비밀번호" ref={passwordRef} disabled />
        <input placeholder="이름" ref={nameRef} disabled />
        <input placeholder="전화번호" ref={phoneNumberRef} disabled />
        <button type="submit">회원가입</button>
      </form>
    </main>
  );
};

export default SignUpPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { accessToken, refreshToken } = cookies(context);

  if (accessToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (refreshToken) {
    const { success } = await AuthService.refresh();
    if (success) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }

  return { props: {} };
};
