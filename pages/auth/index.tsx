import styles from "../../styles/LoginPage.module.css";

const LoginPage = () => {
  return (
    <main className={styles.container}>
      <form className={styles.form}>
        <input placeholder="아이디" />
        <input placeholder="비밀번호" />
        <button type="button">로그인</button>
      </form>
    </main>
  );
};

export default LoginPage;
