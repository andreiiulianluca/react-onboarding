import clsx from "clsx";
import styles from "./Badge.module.scss";

export interface BadgeProps {
  text: string;
  variant: "success" | "error" | "default";
}

const Badge = ({ text, variant }: BadgeProps) => (
  <div className={clsx(styles.badge, styles[variant])}>{text}</div>
);

export default Badge;
