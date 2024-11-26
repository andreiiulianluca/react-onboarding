import { useDispatch, useSelector } from "react-redux";
import CardContainer from "../componentes/CardContainer/CardContainer";
import FilterInput from "../componentes/Filter/category/FilterInput";
import { useState, useEffect } from "react";
import { fetchCharactersPerEpisode } from "../store/slices/episodes/thunk";
import { resetData } from "../store/slices/episodes/slice";
import { AppDispatch, RootState } from "../store";

const Episodes = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.episode
  );

  const episodeName = data?.episode_name || "Unknown";
  const airDate = data?.air_date || "Unknown";

  useEffect(() => {
    dispatch(resetData());
    dispatch(fetchCharactersPerEpisode(selectedEpisode));
  }, [selectedEpisode, dispatch]);

  const handleEpisodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEpisode(Number(event.target.value));
  };

  return (
    <div className="container">
      <div className="row mb-3">
        <h1 className="text-center text-2xl mt-3 mb-3">
          Episode name: <span className="text-primary">{episodeName}</span>
        </h1>
        <h5 className="text-center">Air Date: {airDate}</h5>
      </div>
      <div className="flex container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full h-fit sm:w-80 ml-6 mr-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-700">Pick an episode</h2>
          </div>
          <div className="accordion space-y-4">
            <FilterInput
              name="Episode"
              total={51}
              action={handleEpisodeChange}
              value={selectedEpisode}
            />
          </div>
        </div>
        <CardContainer
          type="normal"
          characters={data?.characters || []}
          action={fetchCharactersPerEpisode(selectedEpisode)}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default Episodes;
