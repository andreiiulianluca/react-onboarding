import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { appCategories } from "../../utils/constants";

interface HeaderProps {
  searchInputValue: string;
  headerHasSearchBar: boolean;
  onSearchInputChange: React.Dispatch<React.SetStateAction<string>>;
}

const Header = ({
  searchInputValue,
  headerHasSearchBar,
  onSearchInputChange,
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
          Rick & Morty
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
        {appCategories.map((category, index) => (
          <NavLink
            key={index}
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
