import CardProp from "./CardProps";
import styles from "./Card.module.scss";

const Card = ({ id, image, name, location, status }: CardProp) => {
  if (!id) {
    return <div>No data available</div>;
  }

  const badgeClass = (() => {
    switch (status) {
      case "Dead":
        return "bg-red-600";
      case "Alive":
        return "bg-green-600";
      default:
        return "bg-zinc-500";
    }
  })();

  return (
    <div
      key={id}
      className={`${styles.card} max-w-sm rounded overflow-hidden shadow-lg bg-white w-64 max-h-64 relative`}
    >
      <div className={`${styles.badge} ${badgeClass}`}>{status}</div>

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
  );
};

export default Card;
