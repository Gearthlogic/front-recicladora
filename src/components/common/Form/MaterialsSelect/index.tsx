import { FormControl, Select, InputLabel, MenuItem, SelectProps } from "@material-ui/core";
import { memo } from "react";

import translations from '../../../../assets/translations.json';
import { Material } from '../../../../constants/enums/material.enum';

const materials = Object.values(Material);

function MaterialSelect(props: SelectProps) {
    return (
        <FormControl>
            <InputLabel id="material-select" >Material </InputLabel>
            <Select
                labelId="material-select"
                {...props}
            >
                {materials.map(material => (
                    <MenuItem key={material} value={material} >
                        {translations['es-ES'][material]}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default memo(MaterialSelect)