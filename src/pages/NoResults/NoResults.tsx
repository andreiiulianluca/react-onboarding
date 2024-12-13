import styles from "./NoResults.module.scss";

const NoResults = () => {
  return (
    <div className={styles.noResults}>
      <h2>No Results Found</h2>
      <p>Try adjusting your search or filter criteria.</p>
    </div>
  );
};

export default NoResults;
