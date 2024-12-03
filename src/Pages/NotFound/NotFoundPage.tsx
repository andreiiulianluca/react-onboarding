import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Page Not Found</p>
      <a className={styles.link} href="/">
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
