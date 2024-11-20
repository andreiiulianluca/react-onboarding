import React from "react";
import styles from "./Navbar.module.scss";
import NavbarProps from "./NavbarProps";

const Navbar = ({ setSearch, updatePageNumber }: NavbarProps) => {
  return (
    <div className="flex items-center h-16 bg-blue-500 px-6">
      <h1 className="text-2xl sm:text-4xl text-white font-bold mr-auto">
        Characters
      </h1>

      <form className={`${styles.search} flex flex-row items-center gap-4`}>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            updatePageNumber(1);
            setSearch(e.target.value);
          }}
          placeholder="Search for characters"
          className={`${styles.input} px-4 py-2 border rounded-md`}
          type="text"
        />
      </form>
    </div>
  );
};

export default Navbar;
