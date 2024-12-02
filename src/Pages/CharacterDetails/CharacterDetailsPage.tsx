import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCharacterDetails } from "../../store/slices/characterDetails/thunk";
import { resetData } from "../../store/slices/characterDetails/slice";
import { AppDispatch, useAppSelector } from "../../store";
import styles from "./CharacterDetailsPage.module.scss";

const CharacterDetails = () => {
  let { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error } = useAppSelector(
    (state) => state.characterDetail
  );

  const { name, image, gender, location, origin, species } = data || {};

  const locationName = location?.name;
  const originName = origin?.name;

  useEffect(() => {
    dispatch(resetData());
    dispatch(fetchCharacterDetails(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <div className={styles.loadingText}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.errorText}>Error: {error}</div>;
  }

  return (
    <div className={styles.characterDetailsContainer}>
      <div className={styles.characterDetailsContent}>
        <h1 className={styles.characterName}>{name}</h1>
        <img className={styles.characterImage} src={image} alt={name} />
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
