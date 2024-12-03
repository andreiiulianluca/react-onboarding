import { Link } from "react-router-dom";
import styles from "./Card.module.scss";
import clsx from "clsx";

interface CardProp {
  id: number;
  title: string;
  image: string;
  badge: string;
  description: string;
}

const Card = ({ id, image, title, badge, description }: CardProp) => {
  if (!id || !image || !title) {
    return <div className={styles.noData}>No data available</div>;
  }

  const badgeClass = (() => {
    switch (badge) {
      case "Dead":
        return styles["bg-red-600"];
      case "Alive":
        return styles["bg-green-600"];
      default:
        return styles["bg-zinc-500"];
    }
  })();

  return (
    <Link to={`${id}`} className={styles.card}>
      <div className={styles.cardContent}>
        <div className={clsx(styles.badge, badgeClass)}>{badge}</div>
        <img src={image} alt={title} className={styles.img} />
        <div className={styles.content}>
          <h5>{title}</h5>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
