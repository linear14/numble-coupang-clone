import styles from "../../styles/SignUpPage.module.css";

const SignUpPage = () => {
  return (
    <main className={styles.container}>
      <form className={styles.form}>
        <input placeholder="아이디" />
        <input placeholder="비밀번호" />
        <input placeholder="이름" />
        <input placeholder="전화번호" />
        <button type="button">회원가입</button>
      </form>
    </main>
  );
};

export default SignUpPage;
