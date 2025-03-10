import React from "react";
import styles from "./RadioButton.module.scss";

interface RadioButtonProps {
  id: string;
  label: string;
  isChecked: boolean;
  onChange: () => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  label,
  isChecked,
  onChange,
}) => {
  return (
    <div className={styles.radioButtonContainer}>
      <input
        type="radio"
        id={id}
        checked={isChecked}
        onChange={onChange}
        className={styles.radioButtonInput}
      />
      <label htmlFor={id} className={styles.radioButtonLabel}>
        <span className={styles.radioButtonCustom}></span>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
