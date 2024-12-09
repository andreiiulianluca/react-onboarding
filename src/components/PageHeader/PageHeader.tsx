import React from "react";
import styles from "./PageHeader.module.scss";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  description,
}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.textPrimary}>{title}</h1>
      {subtitle && <h5 className={styles.textCenter}>{subtitle}</h5>}
      {description && <h6 className={styles.textCenter}>{description}</h6>}
    </div>
  );
};

export default PageHeader;
