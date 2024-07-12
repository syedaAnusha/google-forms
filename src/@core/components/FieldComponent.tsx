import { Container, TextField, Box, Typography } from "@mui/material";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useParams } from "react-router-dom";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import Checkbox from "@mui/material/Checkbox";
import useFetch from "../../hooks/useFetch";

const FieldComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: forms } = useFetch("http://localhost:3001/forms");
  const [num, setNum] = useState<string>("");
  const [req, setReq] = useState<boolean>(false);
  const [fieldTitle, setFieldTitle] = useState<string>("");
  const [formTitle, setFormTitle] = useState<string>("");
  const [options, setOptions] = useState([
    { value: "option 1", label: "Option A", id: Math.random() },
    { value: "option 2", label: "Option B", id: Math.random() },
  ]);

  const handleChange = (event: SelectChangeEvent) => {
    setNum(event.target.value as string);
  };

  const addOption = () => {
    const newOptionIndex = options.length + 1;
    setOptions([
      ...options,
      {
        value: ``,
        label: `Option ${newOptionIndex}`,
        id: Math.random(),
      },
    ]);
  };

  const removeOption = (idToRemove: number) => {
    setOptions(options.filter((option) => option.id !== idToRemove));
  };

  const saved = async () => {
    if (!fieldTitle.length && req) {
      return;
    }

    try {
      const formExists = forms.some((form: { id: string }) => form.id === id);

      if (!formExists) {
        console.error(`Form with id '${id}' does not exist.`);
        return;
      }

      const form = forms.find((form: { id: string }) => form.id === id);

      const updatedForm = {
        ...form,
        countForComp: [
          ...(form.countForComp || []),
          {
            choice: num === "1" ? "text" : num === "2" ? "mcqs" : "checkbox",
            description: fieldTitle,
            subTitle: formTitle,
            required: num === "1" ? req : false,
            values: options.map((option) => option.value),
          },
        ],
      };

      const response = await fetch(`http://localhost:3001/forms/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedForm),
      });

      if (response.ok) {
        console.log("Form data updated successfully!");
      } else {
        console.error("Failed to update form data.");
      }
    } catch (error) {
      console.error("Error:", error);
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
              onChange={(e) => setFieldTitle(e.target.value)}
              value={fieldTitle}
              sx={{ width: "60%" }}
              inputProps={{ style: { fontSize: 25 } }}
            />
            {!fieldTitle.length && req && (
              <Typography variant="h6" component="h6" sx={{ color: "red" }}>
                Field must be filled!
              </Typography>
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
              placeholder="Add Form Title"
              fullWidth
              required={req}
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
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
                <MenuItem value="3">Checkboxes</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box mt={2}>{renderField()}</Box>
        {num === "1" && (
          <FormGroup>
            <FormControlLabel
              control={<Switch onClick={() => setReq((req) => !req)} />}
              label="required"
            />
          </FormGroup>
        )}

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
