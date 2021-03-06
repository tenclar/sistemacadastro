import React, { useRef, useEffect } from 'react';
import { OptionTypeBase, Props as SelectProps } from 'react-select';

import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, SelectCustom, Error } from './styles';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  // options: GroupedOptionsType<OptionTypeBase> | OptionsType<OptionTypeBase>;
}

const Select: React.FC<Props> = ({ name, options, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }

          return ref.state.value.map((option: OptionTypeBase) => option);
        }
        if (!ref.state.value) {
          return '';
        }

        return ref.state.value.id;
      },
      clearValue: (ref) => {
        ref.select.clearValue();
      },
      setValue: (ref, value) => {
        ref.select.setValue(value || null);
      },
    });
  }, [fieldName, registerField, rest.isMulti, options]);
  return (
    <>
      <Container>
        <SelectCustom
          classNamePrefix="react-select"
          defaultValue={defaultValue}
          options={options}
          ref={selectRef}
          {...rest}
        />

        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={16} />
          </Error>
        )}
      </Container>
    </>
  );
};

export default Select;

// ref.select.setValue(value || null);
// ref.select.setValue(value, 'select-option');
/* let selectedOptions;
        if (rest.isMulti) {
          selectedOptions = options?.filter((option) => value.includes(option));
        } else {
          selectedOptions = options?.find((option) => option.id === value);
        }

        ref.select.setValue(selectedOptions, 'select-option'); */
