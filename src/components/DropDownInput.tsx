'use client'
import React from "react";
import Select from 'react-select'; // Import react-select

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
    id: string,
    name: string
    options: Option[];
    label: string;
    placeholder?: string;
    onChange: (value: string) => void;
    value: string;
}


const CustomDropdown: React.FC<DropdownProps> = ({ id, name, options, label, placeholder = "Select an option", onChange, value }) => {
    const customStyles = {
        control: (styles: any) => ({
          ...styles,
          backgroundColor: 'white',
          borderRadius: '9999px',
          border: '1px solid #d3d3d3',
          paddingLeft: '1rem',
          paddingRight: '2.5rem',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          height: '2.75rem', // Adjust height to match your original select
        }),
        indicatorSeparator: (styles: any) => ({ display: 'none' }),
        dropdownIndicator: (styles: any) => ({
          ...styles,
          paddingRight: '10px',
          color: '#808080',
          svg: {
            display: 'none',
          },
          backgroundImage: `url(drop.png)`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '1.25rem',
          height: '1.25rem',
        }),
        option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => ({
          ...styles,
          backgroundColor: isFocused ? '#e0e0e0' : isSelected ? '#d0d0d0' : 'white',
          color: 'black',
          cursor: isDisabled ? 'not-allowed' : 'default',
          padding: '0.5rem',
        }),
        clearIndicator: (styles: any) => ({ display: 'none' }),
      };
    
  const handleChange = (selectedOption: any) => {
    onChange(selectedOption ? selectedOption.value : "");
  };

  const selectedOption = value ? options.find(option => option.value === value) : null;

  return (
    <div>
      <label htmlFor={label.toLowerCase()} className="block text-sm font-semibold text-gray-700 mb-2"> {/* htmlFor now dynamic */}
        {label}
      </label>
      <Select
        id={id} 
        name={name}
        classNamePrefix="my-select"
        options={options}
        styles={customStyles}
        isClearable={true}
        placeholder={placeholder}
        value={selectedOption}
        onChange={handleChange}
      />
    </div>
  );
};


export default CustomDropdown;