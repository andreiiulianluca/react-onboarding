import styles from "./NoResults.module.scss";

interface NoResultsProps {
  title: string;
  description?: string;
}

const NoResults = ({ title, description }: NoResultsProps) => {
  return (
    <div className={styles.noResults}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default NoResults;
