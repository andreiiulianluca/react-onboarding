import React from "react";
import styles from "./Sidebar.module.scss";

interface SidebarProps {
  title: string;
  children: React.ReactNode;
}

const Sidebar = ({ title, children }: SidebarProps) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h2>{title}</h2>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Sidebar;
