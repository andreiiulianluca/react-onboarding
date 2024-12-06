import clsx from "clsx";
import Card from "../Card/Card";
import { Character } from "../../types/types";
import styles from "./CardContainer.module.scss";

interface CardContainerProps {
  characters: Character[] | undefined;
  isLoading: boolean;
  error?: string;
}

const CardContainer = ({
  characters,
  isLoading,
  error,
}: CardContainerProps) => {
  return (
    <>
      {characters
        ? characters.map((character) => (
            <Card
              key={character.id}
              id={character.id}
              image={character.image}
              title={character.name}
              status={character.status}
              description={character.location.name}
            />
          ))
        : !isLoading && <div className={styles.message}>No results found</div>}
      {isLoading && (
        <div className={clsx(styles.message, styles.loading)}>Loading...</div>
      )}
      {error && (
        <div className={clsx(styles.message, styles.error)}>Error: {error}</div>
      )}
    </>
  );
};

export default CardContainer;
