import { Link } from "react-router-dom";
import styles from "./Card.module.scss";
import Badge from "../Badge/Badge";
import { BadgeProps } from "../Badge/Badge";
interface CardProps {
  id: number;
  title: string;
  image: string;
  description?: string;
  badgeProps?: BadgeProps;
}

const Card = ({ id, image, title, description, badgeProps }: CardProps) => (
  <Link to={`/${id}`} className={styles.card}>
    <div className={styles.cardContent}>
      {badgeProps && (
        <Badge text={badgeProps.text} variant={badgeProps.variant} />
      )}
      <img src={image} alt={title} className={styles.img} />
      <div className={styles.content}>
        <p className={styles.contentTitle}>{title}</p>
        <p>{description}</p>
      </div>
    </div>
  </Link>
);

export default Card;
