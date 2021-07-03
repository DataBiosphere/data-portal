/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Data Portal select box.
 */

// Core dependencies
import React from 'react'
import RSelect from 'react-select'

// Styles
/* eslint-disable no-unused-vars */

import compStyles from './select.module.css' // Must include styles here to override react-select element styles that aren't exposed through API

const Select = ({ isSearchable, name, onChange, options, value }) => {
  const styles = {
    control: provided => ({
      ...provided,
      border: '1px solid #cccccc',
      boxShadow: 'none',
      borderRadius: '2px',
      minHeight: '34px',
      ':hover': {
        border: '1px solid #cccccc',
        boxShadow: 'none',
      },
    }),
    indicatorSeparator: provided => ({
      ...provided,
      marginBottom: '4px',
      marginTop: '4px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#1c7cc7'
        : state.isFocused
        ? '#DAF0F6'
        : '#ffffff',
      transition: 'background-color 500ms cubic-bezier(0.25, 0.8, 0.25, 1);',
    }),
    singleValue: provided => ({
      ...provided,
      color: '#000000',
      marginLeft: '0',
      marginRight: '0',
    }),
    valueContainer: provided => ({
      ...provided,
      padding: '0 16px',
    }),
  }

  return (
    <RSelect
      name={name}
      value={value}
      isSearchable={isSearchable}
      onChange={onChange}
      options={options}
      styles={styles}
    />
  )
}

export default Select
