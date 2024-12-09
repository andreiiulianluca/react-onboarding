import styles from "./CardContainer.module.scss";

interface CardContainerProps {
  children: React.ReactNode;
}

const CardContainer = ({ children }: CardContainerProps) => {
  return <div className={styles.containerGrid}>{children}</div>;
};

export default CardContainer;
