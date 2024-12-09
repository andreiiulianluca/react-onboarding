import styles from "./Checkbox.module.scss";

interface CheckboxProps {
  id: string;
  label: string;
  isChecked: boolean;
  onChange: () => void;
}

const Checkbox = ({ id, label, isChecked, onChange }: CheckboxProps) => {
  return (
    <div className={styles.checkboxContainer}>
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={onChange}
        className={styles.checkboxInput}
      />
      <label htmlFor={id} className={styles.checkboxLabel}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
