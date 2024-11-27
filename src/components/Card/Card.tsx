import { Link } from "react-router-dom";
import styles from "./Card.module.scss";
import CardProp from "./CardProps";

const Card = ({ id, image, name, location, status }: CardProp) => {
  if (!id || !image || !name) {
    return <div className={styles.noData}>No data available</div>;
  }

  const badgeClass = (() => {
    switch (status) {
      case "Dead":
        return styles["bg-red-600"];
      case "Alive":
        return styles["bg-green-600"];
      default:
        return styles["bg-zinc-500"];
    }
  })();

  return (
    <Link to={`/character/${id}`} className={styles.card}>
      <div className={styles.cardContent}>
        <div className={`${styles.badge} ${badgeClass}`}>{status}</div>
        <img src={image} alt={name} className={styles.img} />
        <div className={styles.content}>
          <h5>{name}</h5>
          <p>{location?.name || "Unknown Location"}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
