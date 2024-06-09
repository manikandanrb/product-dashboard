import { Item } from "@/types";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface SelectProps {
  items: Item[];
  mode: "single" | "multiple";
  handleChange: (value: string | string[]) => void;
  placeholder: string;
  disabled?: boolean;
  value: string | string[];
}

const SelectInput: React.FC<SelectProps> = (props) => {
  const { items, mode, handleChange, placeholder, disabled, value } = props;

  const handleValueChange = (event: SelectChangeEvent<typeof value>) => {
    const {
      target: { value },
    } = event;
    const selectedValue =
      typeof value === "string" && mode === "multiple"
        ? value.split(",")
        : value;
    handleChange(selectedValue);
  };

  return (
    <>
      <FormControl sx={{ my: 1, width: 300 }}>
        <InputLabel id="multiple-name-label">{placeholder}</InputLabel>
        <Select
          labelId="multiple-name-label"
          id="multiple"
          multiple={mode === "multiple"}
          value={value}
          onChange={handleValueChange}
          disabled={disabled}
          input={<OutlinedInput label={placeholder} />}
          MenuProps={MenuProps}
        >
          {items.map((item) => (
            <MenuItem key={item?.value} value={item?.value}>
              {item?.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export { SelectInput };
