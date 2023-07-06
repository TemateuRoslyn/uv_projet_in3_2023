import React, { useState } from 'react';
import Indicator from '../../pages/Authentication/components/Indicator';
import './CustomSelectInput.css';
import { RiCheckLine } from 'react-icons/ri';


interface CustomMultiSelectInputProps {
  inputLabel: string;
  inputPlaceholder: string;
  required: boolean;

  wrapperStyle?: string;
  labelStyle?: string;
  inputStyle?: string;

  maxHeightList?: number;
  matchList: string[];
  selectOptionEvent: (options: string[]) => void;
  typingInputEvent: (inputValue: string) => void;
}

const CustomMultiSelectInput: React.FC<CustomMultiSelectInputProps> = ({
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
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [showIndicator, setShowIndicator] = useState<boolean>(false);

  // fonction qui vérifie si un élément est déjà sélectionné :
  const isOptionSelected = (option: string) => selectedOptions.includes(option);


  const handleOptionSelect = (selectedOption: string) => {
    if (isOptionSelected(selectedOption)) {
      return; // Ne rien faire si l'option est déjà sélectionnée
    }
    setInputValue('');
    setSelectedOptions([...selectedOptions, selectedOption]);
    selectOptionEvent([...selectedOptions, selectedOption]);
  };

  const handleOptionRemove = (removedOption: string) => {
    const updatedOptions = selectedOptions.filter(option => option !== removedOption);
    setSelectedOptions(updatedOptions);
    selectOptionEvent(updatedOptions);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    
    setInputValue(value);
    setIsDropdownOpen(false);
    setShowIndicator(value !== '');
    setIsDropdownOpen(true);
    typingInputEvent(value);
  };

  console.log(matchList);
  

  const isEmpty = () => matchList.length === 0;


  const extractValueFromString = (str: string): string | null => {
    const matches = str.match(/^(.*):(\d+)$/);
    if (matches && matches[1]) {
      return matches[1];
    }
    return null;
  };

  const maxItemsToShow = 3; // Nombre maximal d'éléments à afficher sans scroller
  const totalItems = matchList.length;
  const topPercentage = Math.min((totalItems - maxItemsToShow) * 100, 440) * -1;

  return (
    <div className={`${wrapperStyle} relative`} id="input-wrapper">
      <label htmlFor="input-label" className={`${labelStyle}`}>
        {inputLabel} {required && <span className="text-meta-1">*</span>}
      </label>
      <div className="selected-options-wrapper mb-2">
  
    <div className='selected-options-wrapper-custom'>
      {selectedOptions.map((option, index) => (
          <div key={index} className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-800 rounded-md px-3 py-1 selected-option flex-shrink-0">
            <span>{extractValueFromString(option)}</span>
            <button
              className="text-red-600 dark:text-red-400 focus:outline-none"
              onClick={() => handleOptionRemove(option)}
            >
              &times;
            </button>
          </div>
        ))}
    </div>

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

        
        {showIndicator && inputValue !== '' && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 mt-4">
            <Indicator widtf={5} height={5} border="blue" />
          </div>
        )}

      </div>
      <div
        className="custom-input-dropdown w-full"
        style={{ display: isEmpty() ? 'none' : 'block', maxHeight: '200px', overflowY: 'auto' }}
      >
        <ul>
          {matchList.length > 0 && isDropdownOpen && inputValue !== '' && (
            <div className={`custom-input-dropdown w-full`} style={{ display: isEmpty() ? 'none' : 'block' }}>
              <ul
                style={{ maxHeight: `${maxHeightList}px`, overflowY: 'auto' }}
                className={`absolute top-${topPercentage}% w-full border border-gray-300 rounded-md bg-white shadow-md custom-select-ul`}
              >
                {matchList.map((option, index) => (
                  <li
                    className={`dark:border-form-strokedark bg-red dark:bg-form-input px-4 py-1 hover:bg-red-600 cursor-pointer w-full custom-select-li ${
                      isOptionSelected(option) ? 'selected-option' : ''
                    }`}
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {extractValueFromString(option)}
                    {isOptionSelected(option) && <RiCheckLine className="ml-2" />}
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

export default CustomMultiSelectInput;