import styles from "./Button.module.scss";
import clsx from "clsx";

interface ButtonProps {
  className?: string;
  isActive?: boolean;
  children?: React.ReactNode;
  onClick: () => void;
}

const Button = ({ isActive, className, children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(className, { [styles.active]: isActive })}
    >
      {children}
    </button>
  );
};

export default Button;
