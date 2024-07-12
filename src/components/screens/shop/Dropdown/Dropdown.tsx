import React, { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.scss";
import cn from "classnames";

const options = [
  "по скидкам",
  "по новинкам",
  "по популярности",
  "по возрастанию цены",
  "по убыванию цены",
];

const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[2]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
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
        <span className={styles.text}>{selectedOption}</span>
        <span className={cn(styles.icon, isOpen ? styles.rotate : "")}></span>
      </div>
      {isOpen && (
        <div className={styles.dropdown__menu}>
          {options.map((option) => (
            <div
              key={option}
              className={`${styles.dropdown__menu__item} ${
                selectedOption === option ? styles.selected : ""
              }`}
              onClick={() => selectOption(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
