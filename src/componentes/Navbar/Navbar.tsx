import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { resetData, fetchCharacters } from "../../features/charactersSlice";
import { setSearch } from "../../features/searchSlice";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSearch(value));
    dispatch(resetData());
    dispatch(fetchCharacters());
  };

  return (
    <div className="flex items-center justify-between h-16 bg-blue-600 px-8 shadow-md">
      <h1 className="text-3xl text-white font-bold">
        <NavLink to="/" className="hover:text-sky-300 transition-all">
          Characters
        </NavLink>
      </h1>

      <div className="relative w-1/3">
        <input
          onChange={handleSearch}
          placeholder="Search for characters"
          className="w-full px-4 py-2 text-lg rounded-md border-2 border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          type="text"
        />
      </div>
      <div className="flex gap-8">
        <NavLink
          to="/"
          className={({ isActive }: { isActive: boolean }) =>
            isActive
              ? "text-sky-300 font-bold text-lg"
              : "text-white text-lg font-semibold hover:text-sky-300 transition-all"
          }
        >
          Characters
        </NavLink>
        <NavLink
          to="/episodes"
          className={({ isActive }: { isActive: boolean }) =>
            isActive
              ? "text-sky-300 font-bold text-lg"
              : "text-white text-lg font-semibold hover:text-sky-300 transition-all"
          }
        >
          Episode
        </NavLink>
        <NavLink
          to="/location"
          className={({ isActive }: { isActive: boolean }) =>
            isActive
              ? "text-sky-300 font-bold text-lg"
              : "text-white text-lg font-semibold hover:text-sky-300 transition-all"
          }
        >
          Location
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
