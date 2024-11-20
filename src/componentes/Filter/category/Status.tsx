import React, { useState } from "react";
import FilterButton from "../FilterButton";
import StatusProps from "./StatusProps";

const Status: React.FC<StatusProps> = ({ updateStatus, updatePageNumber }) => {
  const [isOpen, setIsOpen] = useState(false);
  const status = ["Alive", "Dead", "Unknown"];

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
          Status
        </button>
      </h2>

      <div
        id="collapseOne"
        className={`accordion-collapse overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
        aria-labelledby="headingOne"
      >
        <div className="accordion-body p-4">
          <div className="flex flex-wrap gap-3">
            {status.map((item, index) => (
              <FilterButton
                key={index}
                name="status"
                task={updateStatus}
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

export default Status;
