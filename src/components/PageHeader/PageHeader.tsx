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
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <h4 className={styles.subTitle}>{subtitle}</h4>}
      {description && <h5 className={styles.description}>{description}</h5>}
    </div>
  );
};

export default PageHeader;
