/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
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

  const [responses, setResponses] = useState<any>({});

  if (!form) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  const handleInputChange = (field: any, value: any) => {
    setResponses((prevResponses: any) => ({
      ...prevResponses,
      [field.subTitle]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userResponse = {
      formId: id,
      title: form.title,
      responses,
    };

    try {
      const response = await fetch(`http://localhost:3001/userResponse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userResponse),
      });

      if (response.ok) {
        console.log("User response saved successfully!");
        navigate(`/SubmitPage/${id}`);
      } else {
        console.error("Failed to save user response.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
                  onChange={(e) => handleInputChange(field, e.target.value)}
                />
              )}
              {field.choice === "mcqs" && (
                <RadioGroup
                  aria-label={field.subTitle}
                  name={field.subTitle}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                >
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
                      onChange={(e) =>
                        handleInputChange(field, e.target ? option : null)
                      }
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
