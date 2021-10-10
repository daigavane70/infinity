import { FormControl, InputLabel, MenuItem, Select as MuiSelect, FormHelperText } from '@material-ui/core';
import React from 'react'

export default function Select(props) {

    const { name, value, label, onChange, options, error=null } = props;

    return (
        <FormControl variant="outlined"
        {...(error && {error: true, helperText: error})} 
        >
            
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}
            >

                <MenuItem value="">None</MenuItem>
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.id}> {item.title} </MenuItem>)
                    )
                }

            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
