import React, { useState } from 'react';
import Indicator from '../../pages/Authentication/components/Indicator';
import './CustomSelectInput.css'

interface CustomSelectInputProps {
  inputLabel: string;
  inputPlaceholder: string;
  required: boolean,

  wrapperStyle?: string;
  labelStyle?: string;
  inputStyle?: string;
  
  maxHeightList?: number;
  matchList: string[];
  selectOptionEvent: (option: string) => void;
  typingInputEvent: (inputValue: string) => void;
}

const CustomSelectInput: React.FC<CustomSelectInputProps> = ({
  inputLabel,
  inputPlaceholder,
  required,
  wrapperStyle,
  labelStyle,
  inputStyle,
  maxHeightList,
  matchList,
  selectOptionEvent,
  typingInputEvent
}) => {

  const [inputValue, setInputValue] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [showIndicator, setShowIndicator] = useState<boolean>(false);


  const handleOptionSelect = (selectedValue: string) => {
    setInputValue(selectedValue);
    setIsDropdownOpen(false);
    selectOptionEvent(selectedValue);
    setShowIndicator(false)
  };
  
  const isEmpty = () => matchList.length === 0;
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    setShowIndicator(value !== '');
    setIsDropdownOpen(true);
    typingInputEvent(value);
  };

  const extractValueFromString = (str: string): string | null => {
    const matches = str.match(/^(.*):(\d+)$/);
    if (matches && matches[1]) {
      return matches[1];
    }
    return null;
  };


  const maxItemsToShow = 3; // Nombre maximal d'éléments à afficher sans scroller
  const totalItems = matchList.length;

  // Calcul du pourcentage en fonction du nombre d'éléments
  const topPercentage = Math.min((totalItems - maxItemsToShow) * 100, 440)*(-1);
  

  return (
    <div className={`${wrapperStyle} relative`} id="input-wrapper">
      <label htmlFor="input-label" className={`${labelStyle}`}>
        {inputLabel} {required && <span className="text-meta-1">*</span>}
      </label>
      <input
        type="text"
        className={`${inputStyle}`}
        value={inputValue}
        placeholder={inputPlaceholder}
        id="input-label"
        autoComplete="off"
        required
        onChange={handleInputChange}
      />
      {showIndicator && 
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 mt-4">
          <Indicator widtf={5} height={5} border="blue"/>
        </div>}
      <div 
        className="custom-input-dropdown w-full" 
        style={{ display: isEmpty() ? 'none' : 'block', maxHeight: '200px', overflowY: 'auto' }}>
        <ul>
        {matchList.length > 0 && isDropdownOpen && inputValue !=='' && (
        <div 
          className={`custom-input-dropdown w-full`}
          style={{ display: isEmpty() ? 'none' : 'block' }}
        >
          <ul 
            style={{ maxHeight: `${maxHeightList}px`, overflowY: 'auto' }}
            className={`absolute top-${topPercentage}% w-full border border-gray-300 rounded-md bg-white shadow-md custom-select-ul`}>
            {matchList.map((option, index) => (
              <li 
                className="dark:border-form-strokedark bg-red dark:bg-form-input px-4 py-1 hover:bg-red-600 cursor-pointer w-full custom-select-li"
                key={index} 
                onClick={() => handleOptionSelect(option)}
              >
                {extractValueFromString(option)}
              </li>
            ))}
          </ul>
        </div>
      )}
        </ul>
      </div>
    </div>
  );
};

export default CustomSelectInput;
