import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCharacterDetails } from "../../store/slices/characterDetails/thunk";
import { AppDispatch, useAppSelector } from "../../store";
import styles from "./CharacterDetailsPage.module.scss";

const CharacterDetails = () => {
  let { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { characterDetails, isLoading, error } = useAppSelector(
    (state) => state.characterDetail
  );

  const { name, image, gender, location, origin, species } =
    characterDetails || {};

  const locationName = location?.name;
  const originName = origin?.name;

  useEffect(() => {
    dispatch(fetchCharacterDetails(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.name}>{name}</h1>
        <img className={styles.image} src={image} alt={name} />
        <div className={styles.detailsContent}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Gender: </span>
            {gender}
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Location: </span>
            {locationName}
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Origin: </span>
            {originName}
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Species: </span>
            {species}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
