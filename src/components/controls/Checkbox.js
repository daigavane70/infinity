import React from 'react'
import { FormControlLabel, Checkbox as MuiCheckbox, FormControl } from '@material-ui/core';
import convertToDefaultEventParameter from './convertToDefaultEventParameter';

export default function Checkbox(props) {

    const { name, value, label, onChange } = props;

    return (
        <FormControl>
            <FormControlLabel

                control={
                <MuiCheckbox 
                    color="primary"
                    name={name}
                    value={value}
                    checked={value}
                    onChange={e => onChange(convertToDefaultEventParameter(name, e.target.checked))}
                />}
                label={label}
            />
        </FormControl>
    )
}
