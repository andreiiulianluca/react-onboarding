import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetData } from "../../store/slices/characters/slice";
import { setSearch } from "../../store/slices/search/slice";
import { NavLink, useLocation } from "react-router-dom";
import { fetchCharacters } from "../../store/slices/characters/thunk";
import { AppDispatch } from "../../store";
import useDebounce from "../../hooks/useDebounce";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    dispatch(setSearch(debouncedSearchTerm));
    dispatch(resetData());
    dispatch(fetchCharacters());
  }, [debouncedSearchTerm, dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.navbar}>
      <h1 className={styles.title}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Characters
        </NavLink>
      </h1>
      <div className={styles.search}>
        {location.pathname === "/" && (
          <input
            onChange={handleSearch}
            value={searchTerm}
            placeholder="Search for characters"
            type="text"
          />
        )}
      </div>
      <div className={styles.links}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Characters
        </NavLink>
        <NavLink
          to="/episodes"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Episode
        </NavLink>
        <NavLink
          to="/location"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Location
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
