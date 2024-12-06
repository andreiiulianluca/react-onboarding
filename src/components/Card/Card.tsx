import { Link } from "react-router-dom";
import styles from "./Card.module.scss";
import Badge from "../Badge/Badge";

interface CardProps {
  id: number;
  title: string;
  image: string;
  status?: string;
  description?: string;
}

const Card = ({ id, image, title, status, description }: CardProps) => {
  if (!id || !image || !title) {
    return <div className={styles.noData}>No data available</div>;
  }

  const mapStatusToVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "dead":
        return "dead";
      case "alive":
        return "alive";
      default:
        return "unknown";
    }
  };

  return (
    <Link to={`/${id}`} className={styles.card}>
      <div className={styles.cardContent}>
        {status && <Badge text={status} variant={mapStatusToVariant(status)} />}
        <img src={image} alt={title} className={styles.img} />
        <div className={styles.content}>
          <p className={styles.contentTitle}>{title}</p>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
