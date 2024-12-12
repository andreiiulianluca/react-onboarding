import { useDispatch } from "react-redux";
import styles from "./Episodes.module.scss";
import { AppDispatch, useAppSelector } from "../../store";
import { useEffect, useState } from "react";
import { fetchCharactersPerEpisode } from "../../store/slices/episodes/thunk";
import FilterSelect from "../../components/Filter/FilterSelect/FilterSelect";
import CardContainer from "../../components/CardContainer/CardContainer";
import Card from "../../components/Card/Card";
import { EPISODES_TOTAL } from "../../utils/constants";
import { getBadgeVariant } from "../../utils/helpers";
import clsx from "clsx";
import PageHeader from "../../components/PageHeader/PageHeader";
import Sidebar from "../../components/Sidebar/Sidebar";

const EpisodesPage = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const { characters, name, airDate, isLoading, error } = useAppSelector(
    (state) => state.episode
  );

  useEffect(() => {
    dispatch(fetchCharactersPerEpisode(selectedEpisode));
  }, [selectedEpisode, dispatch]);

  const handleEpisodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEpisode(Number(event.target.value));
  };

  return (
    <div className={styles.container}>
      <PageHeader
        title={`Episode name: ${name || "Unknown"}`}
        subtitle={`Air Date: ${airDate || "Unknown"}`}
      />
      <div className={styles.content}>
        <Sidebar title="Pick an episode">
          <FilterSelect
            name="Episode"
            total={EPISODES_TOTAL}
            onFilterChange={handleEpisodeChange}
            value={selectedEpisode}
          />
        </Sidebar>
        <CardContainer>
          {characters
            ? characters.map((character) => (
                <Card
                  key={character.id}
                  id={character.id}
                  image={character.image}
                  title={character.name}
                  badgeProps={{
                    text: character.status,
                    variant: getBadgeVariant(character.status),
                  }}
                  description={character.location.name}
                />
              ))
            : !isLoading && (
                <div className={styles.message}>No results found</div>
              )}
          {isLoading && (
            <div className={clsx(styles.message, styles.loading)}>
              Loading...
            </div>
          )}
          {error && (
            <div className={clsx(styles.message, styles.error)}>
              Error: {error}
            </div>
          )}
        </CardContainer>
      </div>
    </div>
  );
};

export default EpisodesPage;
