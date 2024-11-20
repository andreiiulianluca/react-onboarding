import { CardProp } from "./CardProps";
import styles from "./Card.module.scss";

const Card = ({ character }: { character: CardProp }) => {
  const { id, image, name, location, status } = character;

  if (!character) {
    return <div>No data available</div>;
  }

  const badgeClass = (() => {
    switch (status) {
      case "Dead":
        return "bg-danger";
      case "Alive":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  })();

  return (
    <div>
      <div
        key={id}
        className={`${styles.card} max-w-sm rounded overflow-hidden shadow-lg bg-white w-64 relative`} // Adăugăm relative aici
      >
        <img
          src={image}
          alt={name}
          className={`${styles.img} w-full h-48 object-cover`}
        />
        <div className="px-4 py-2">
          <h5 className="font-semibold text-lg">{name}</h5>
          <p className="text-gray-600">{location.name}</p>
        </div>
      </div>

      <div className={`${styles.badge} position-absolute ${badgeClass}`}>
        {status}
      </div>
    </div>
  );
};

export default Card;
