import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import {
  fetchCharacterDetails,
  resetData,
} from "../features/characterDetailsSlice";

const CharacterDetails = () => {
  let { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.characterDetail
  );

  const name = data?.name;
  const image = data?.image;
  const gender = data?.gender;
  const locationName = data?.location.name;
  const originName = data?.origin.name;
  const species = data?.species;

  useEffect(() => {
    dispatch(resetData());
    dispatch(fetchCharacterDetails(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex justify-center mt-5">
      <div className="flex flex-col gap-3">
        <h1 className="text-center">{name}</h1>
        <img className="img-fluid" src={image} alt="" />
        <div className="content">
          <div className="">
            <span className="fw-bold">Gender : </span>
            {gender}
          </div>
          <div className="">
            <span className="fw-bold">Location: </span>
            {locationName}
          </div>
          <div className="">
            <span className="fw-bold">Origin: </span>
            {originName}
          </div>
          <div className="">
            <span className="fw-bold">Species: </span>
            {species}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
