/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const PreviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: form } = useFetch(`http://localhost:3001/forms/${id}`);

  if (!form) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    goToResponse();
    // Implement form submission logic here
    console.log("Form submitted:", form);
  };

  function goToResponse() {
    navigate(`/SubmitPage/${id}`);
  }

  return (
    <Container>
      <Box my={4}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h2" gutterBottom>
            {form.title}
          </Typography>

          {form.countForComp.map((field: any, index: number) => (
            <Box key={index} my={2}>
              <Typography variant="h5">{field.subTitle}</Typography>
              {field.choice === "text" && (
                <TextField
                  id={`text-field-${index}`}
                  variant="standard"
                  margin="normal"
                  placeholder={field.description}
                  fullWidth
                  required={field.required}
                  inputProps={{ style: { fontSize: 16 } }}
                />
              )}
              {field.choice === "mcqs" && (
                <RadioGroup aria-label={field.subTitle} name={field.subTitle}>
                  {field.values.map((option: string, optionIndex: number) => (
                    <FormControlLabel
                      key={optionIndex}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              )}
              {field.choice === "checkbox" && (
                <FormGroup>
                  {field.values.map((option: string, optionIndex: number) => (
                    <FormControlLabel
                      key={optionIndex}
                      control={<Checkbox />}
                      label={option}
                    />
                  ))}
                </FormGroup>
              )}
            </Box>
          ))}

          <Typography variant="body1">{form.description}</Typography>
          <Button
            type="submit"
            sx={{ paddingInline: "2rem", bgcolor: "lightblue", color: "black" }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default PreviewPage;
