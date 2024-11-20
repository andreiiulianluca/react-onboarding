import { useState } from "react";
import FilterButton from "../FilterButton";
import SpeciesProps from "./SpeciesProps";

const Species: React.FC<SpeciesProps> = ({
  updateSpecies,
  updatePageNumber,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  let species = [
    "Human",
    "Alien",
    "Humanoid",
    "Poopybutthole",
    "Mythological",
    "Unknown",
    "Animal",
    "Disease",
    "Robot",
    "Cronenberg",
    "Planet",
  ];

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item bg-white rounded-lg shadow-md mb-4">
      <h2 className="accordion-header" id="headingOne">
        <button
          className="w-full text-left p-4 bg-blue-500 text-white font-semibold rounded-t-lg hover:bg-blue-600 focus:outline-none transition"
          type="button"
          onClick={toggleAccordion}
          aria-expanded={isOpen ? "true" : "false"}
          aria-controls="collapseOne"
        >
          Species
        </button>
      </h2>
      <div
        id="collapseOne"
        className={`accordion-collapse overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
        aria-labelledby="headingOne"
      >
        <div className="accordion-body p-4 transition-transform">
          <div className="flex flex-wrap gap-3">
            {species.map((item, index) => (
              <FilterButton
                name="status"
                task={updateSpecies}
                updatePageNumber={updatePageNumber}
                input={item}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Species;
