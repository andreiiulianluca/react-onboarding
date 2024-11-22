import React from "react";

const FilterInput = ({
  name,
  total,
  value,
  action,
}: {
  total: number;
  name: string;
  value: number;
  action: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <div className="mb-6">
      <div className="relative">
        <select
          onChange={action}
          value={value}
          id="episode-select"
          className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-lg appearance-none"
        >
          {[...Array(total).keys()].map((_, index) => (
            <option key={index} value={index + 1}>
              {name} - {index + 1}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FilterInput;
