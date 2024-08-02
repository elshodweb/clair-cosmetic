import React, { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.scss";
import cn from "classnames";

const Dropdown: React.FC<any> = ({ options, onChange, lable }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(lable);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: any) => {
    setSelectedOption(option);
    onChange(option.id);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div
        className={`${styles.dropdown__button} ${isOpen ? styles.active : ""}`}
        onClick={toggleDropdown}
      >
        <span className={styles.text}>{selectedOption.title}</span>
        <span className={cn(styles.icon, isOpen ? styles.rotate : "")}></span>
      </div>
      {isOpen && (
        <div className={styles.dropdown__menu}>
          <div
            className={`${styles.dropdown__menu__item} ${
              selectedOption.id === "" ? styles.selected : ""
            }`}
            onClick={() => selectOption(lable)}
          >
           По умолчанию
          </div>
          {options.map((option: any) => (
            <div
              key={option.id}
              className={`${styles.dropdown__menu__item} ${
                selectedOption.id === option.id ? styles.selected : ""
              }`}
              onClick={() => selectOption(option)}
            >
              {option.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
