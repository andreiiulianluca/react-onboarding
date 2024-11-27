import React from "react";
import { NavLink } from "react-router-dom";
import { useSearchFilterContext } from "../../contexts/SearchFilterContext";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const { searchTerm, setSearchTerm } = useSearchFilterContext();

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
        <input
          onChange={handleSearch}
          value={searchTerm}
          placeholder="Search for characters"
          type="text"
        />
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
          to="/locations"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Location
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
