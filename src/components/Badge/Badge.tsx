import clsx from "clsx";
import styles from "./Badge.module.scss";

interface BadgeProps {
  text: string;
  variant: "dead" | "alive" | "unknown";
}

const Badge = ({ text, variant }: BadgeProps) => (
  <div className={clsx(styles.badge, styles[variant])}>{text}</div>
);

export default Badge;
