import { Container, TextField, Box, Typography } from "@mui/material";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import Checkbox from "@mui/material/Checkbox";

const FieldComponent: React.FC = () => {
  const [num, setNum] = useState<string>("");
  const [req, setReq] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const handleChange = (event: SelectChangeEvent) => {
    setNum(event.target.value as string);
  };

  const [options, setOptions] = useState([
    { value: "option 1", label: "Option A", id: Math.random() },
    { value: "option 2", label: "Option B", id: Math.random() },
  ]);

  const addOption = () => {
    const newOptionIndex = options.length + 1;
    setOptions([
      ...options,
      {
        value: `option ${newOptionIndex}`,
        label: `Option ${newOptionIndex}`,
        id: Math.random(),
      },
    ]);
  };

  const removeOption = (idToRemove) => {
    setOptions(options.filter((option) => option.id !== idToRemove));
  };

  const saved = () => {
    if (!title.length && req) {
      return;
    }
  };

  const renderField = () => {
    switch (num) {
      case "1":
        return (
          <>
            <TextField
              id="short-answer"
              variant="standard"
              margin="normal"
              placeholder="Short Answer"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              sx={{ width: "60%" }}
              inputProps={{ style: { fontSize: 25 } }}
            />
            {!title.length && req && (
              <>
                <Typography variant="h6" component="h6" sx={{ color: "red" }}>
                  field must be filled!
                </Typography>
              </>
            )}
          </>
        );
      case "2":
        return (
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={options[0]?.value}
              name="radio-buttons-group"
            >
              {options.map((option) => (
                <Box
                  key={option.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="div"
                    contentEditable="true"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FormControlLabel
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                    />
                  </Box>
                  <Button
                    aria-label="delete"
                    size="small"
                    onClick={() => removeOption(option.id)}
                  >
                    remove
                  </Button>
                </Box>
              ))}
              <Button
                variant="text"
                sx={{
                  padding: "1rem",
                  width: "fit-content",
                  marginRight: "0rem",
                }}
                onClick={addOption}
              >
                Add option
              </Button>
            </RadioGroup>
          </FormControl>
        );
      case "3":
        return (
          <FormControl>
            <FormGroup>
              {options.map((option) => (
                <Box
                  key={option.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    key={option.id}
                    component="div"
                    contentEditable="true"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <FormControlLabel
                      control={<Checkbox />}
                      label={option.label}
                    />
                  </Box>
                  <Button
                    aria-label="delete"
                    size="small"
                    onClick={() => removeOption(option.id)}
                  >
                    remove
                  </Button>
                </Box>
              ))}
              <Button
                variant="text"
                sx={{
                  padding: "1rem",
                  width: "fit-content",
                  marginRight: "0rem",
                }}
                onClick={addOption}
              >
                Add option
              </Button>
            </FormGroup>
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Box
        my={4}
        sx={{
          border: "1px solid transparent",
          borderRadius: "5px",
          bgcolor: "lightgrey",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          width: "50%",
        }}
      >
        <Box
          sx={{
            border: "1px solid transparent",
            borderRadius: "5px",
            bgcolor: "lightgrey",
            padding: "1rem",
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
          }}
        >
          <form>
            <TextField
              id="standard-basic"
              variant="standard"
              margin="normal"
              placeholder="Add Title"
              fullWidth
              required={req}
              inputProps={{ style: { fontSize: 25 } }}
            />
          </form>
          <Box mt={2}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={num}
                onChange={handleChange}
              >
                <MenuItem value="1">Short Answer</MenuItem>
                <MenuItem value="2">Multiple Choice</MenuItem>
                <MenuItem value="3">CheckBox</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box mt={2}>{renderField()}</Box>
        <FormGroup>
          <FormControlLabel
            control={<Switch onClick={() => setReq((req) => !req)} />}
            label="required"
          />
        </FormGroup>
        <Button
          variant="text"
          sx={{
            padding: "1rem",
            width: "fit-content",
            marginRight: "0rem",
          }}
          onClick={saved}
        >
          Save
        </Button>
      </Box>
    </Container>
  );
};

export default FieldComponent;
