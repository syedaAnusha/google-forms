import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function BasicSelect() {
  const [num, setNum] = React.useState("Short Answer");

  const handleChange = (event: SelectChangeEvent) => {
    setNum(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={num}
          onChange={handleChange}
        >
          <MenuItem value={1}>Short Answer</MenuItem>
          <MenuItem value={2}>Multiple Choice</MenuItem>
          <MenuItem value={3}>CheckBox</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
