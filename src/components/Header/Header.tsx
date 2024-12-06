import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { appCategories } from "../../utils/constants";

interface HeaderProps {
  searchInputValue: string;
  onSearchInputChange: React.Dispatch<React.SetStateAction<string>>;
  headerHasSearchBar: boolean;
}

const Header = ({
  searchInputValue,
  onSearchInputChange,
  headerHasSearchBar,
}: HeaderProps) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchInputChange(e.target.value);
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
      {headerHasSearchBar && (
        <div className={styles.search}>
          <input
            onChange={handleSearch}
            value={searchInputValue}
            placeholder="Search for characters"
            type="text"
          />
        </div>
      )}
      <div className={styles.links}>
        {appCategories.map((category) => (
          <NavLink
            to={category.title}
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            {category.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Header;
