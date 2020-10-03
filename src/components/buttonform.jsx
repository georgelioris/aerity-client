import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Button, FormField, TextInput, Form } from 'grommet';
import { Location, Search } from 'grommet-icons';
import validator from 'validator';

const sanitizeInput = (input) =>
  validator.blacklist(
    input,
    '\\[\\]\\`\\+=\\*<>-@#\\$\\%^&()_\\-\\!|{};:\'"\\.'
  );

const ButtonForm = ({ getCoords, fetchCoords, onSub, location }) => {
  const [value, setValue] = useState({ name: '' });
  return (
    <Form
      value={value}
      onChange={({ name }) => setValue({ name: sanitizeInput(name) })}
      onSubmit={() => {
        fetchCoords(`${value.name.trim()}`);
        if (onSub) onSub();
      }}
    >
      <FormField name="name" htmlfor="text-input-id" direction="row">
        <TextInput
          icon={<Search color="dark-5" />}
          reverse
          placeholder={
            <Text color="dark-5">
              <i>{location || 'London,GB'}</i>
            </Text>
          }
          name="name"
        />
      </FormField>
      <Box direction="column" gap="medium" justify="center">
        <Text alignSelf="center"> or </Text>
        <Button
          onClick={() => {
            if (onSub) onSub();
            return getCoords();
          }}
          primary
          color="accent-3"
          label="Use my location"
          icon={<Location />}
          size="small"
        />
      </Box>
    </Form>
  );
};
export default ButtonForm;

ButtonForm.propTypes = {
  getCoords: PropTypes.func.isRequired,
  fetchCoords: PropTypes.func.isRequired,
  onSub: PropTypes.func,
  location: PropTypes.string
};

ButtonForm.defaultProps = {
  onSub: undefined,
  location: undefined
};
