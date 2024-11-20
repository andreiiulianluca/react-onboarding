import Gender from "./category/Gender";
import Species from "./category/Species";
import Status from "./category/Status";
import FilterProps from "./FilterProps";

const Filter: React.FC<FilterProps> = ({
  updatePageNumber,
  updateStatus,
  updateGender,
  updateSpecies,
}) => {
  const clearFilters = () => {
    updateStatus("");
    updateGender("");
    updateSpecies("");
    updatePageNumber(1);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full h-fit sm:w-80 mt-5 mr-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-700">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
        >
          Clear
        </button>
      </div>

      <div className="accordion space-y-4">
        <Status
          updatePageNumber={updatePageNumber}
          updateStatus={updateStatus}
        />
        <Species
          updatePageNumber={updatePageNumber}
          updateSpecies={updateSpecies}
        />
        <Gender
          updatePageNumber={updatePageNumber}
          updateGender={updateGender}
        />
      </div>
    </div>
  );
};

export default Filter;
