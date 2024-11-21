import React, { useState } from "react";
import FilterButton from "../FilterButton";

import { setGender } from "../../../features/filterSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { FilterButtonType } from "../FilterProps";

const Gender: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const genders = ["female", "male", "genderless", "unknown"];
  const gender = useSelector((state: RootState) => state.filter.gender);

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
          Gender
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
            {genders.map((item, index) => (
              <FilterButton
                key={index}
                type={FilterButtonType.GENDER}
                action={setGender}
                input={item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gender;
